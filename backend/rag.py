import os
from pathlib import Path
import chromadb
from sentence_transformers import SentenceTransformer
from knowledge import FAISAL_KNOWLEDGE

# Initialize Chroma client (local, persistent)
chroma_client = chromadb.PersistentClient(path="./chroma_data")

# Initialize embedding model (lightweight)
embedder = SentenceTransformer('all-MiniLM-L6-v2')

def chunk_knowledge():
    """Split FAISAL_KNOWLEDGE into logical sections."""
    chunks = []

    # Split by "===" section headers
    sections = FAISAL_KNOWLEDGE.split("===")

    for section in sections:
        section = section.strip()
        if not section:
            continue

        lines = section.split("\n")
        section_title = lines[0] if lines else ""

        # For FAQ section, split by Q: markers
        if "Q:" in section:
            current_qa = []
            for line in lines:
                current_qa.append(line)
                # Split Q&A pairs
                if line.startswith("Q:") and len(current_qa) > 1:
                    chunk_text = "\n".join(current_qa[:-1]).strip()
                    if chunk_text and "Q:" in chunk_text:
                        chunks.append(chunk_text)
                    current_qa = [line]

            # Add last Q&A pair
            if current_qa:
                chunk_text = "\n".join(current_qa).strip()
                if chunk_text:
                    chunks.append(chunk_text)
        else:
            # For other sections, create chunks by subsection
            current_chunk = [section_title]
            current_length = len(section_title)

            for line in lines[1:]:
                current_chunk.append(line)
                current_length += len(line)

                # Split on numbered items or if chunk is long
                if (line.strip().startswith("-") and current_length > 300) or current_length > 800:
                    chunk_text = "\n".join(current_chunk).strip()
                    if chunk_text:
                        chunks.append(chunk_text)
                    current_chunk = [section_title]
                    current_length = len(section_title)

            # Add remaining
            if len(current_chunk) > 1:
                chunk_text = "\n".join(current_chunk).strip()
                if chunk_text:
                    chunks.append(chunk_text)

    return chunks

def initialize_rag():
    """Initialize RAG vector database."""
    # Check if collection already exists
    try:
        collection = chroma_client.get_collection(name="faisal_knowledge")
        print("✓ RAG database already initialized")
        return collection
    except:
        pass

    # Create new collection
    print("Initializing RAG database...")
    collection = chroma_client.create_collection(name="faisal_knowledge")

    # Chunk knowledge
    chunks = chunk_knowledge()
    print(f"  Chunked knowledge into {len(chunks)} segments")

    # Embed and store
    for i, chunk in enumerate(chunks):
        embedding = embedder.encode(chunk).tolist()
        collection.add(
            ids=[f"chunk_{i}"],
            embeddings=[embedding],
            documents=[chunk],
            metadatas=[{"source": "knowledge.py", "chunk": i}]
        )

    print(f"✓ RAG database initialized with {len(chunks)} chunks")
    return collection

def retrieve_context(query: str, top_k: int = 3) -> str:
    """Retrieve relevant knowledge chunks for a query."""
    collection = chroma_client.get_collection(name="faisal_knowledge")

    # Embed query
    query_embedding = embedder.encode(query).tolist()

    # Search similar chunks
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )

    # Combine retrieved chunks
    if results["documents"] and results["documents"][0]:
        context = "\n---\n".join(results["documents"][0])
        return context

    return ""

def build_rag_prompt(user_message: str, retrieved_context: str) -> str:
    """Build a prompt with retrieved context."""
    if retrieved_context:
        return f"""Based on the following information about Faisal:

{retrieved_context}

---

Answer this question: {user_message}"""
    return user_message

# Initialize on module load
try:
    initialize_rag()
except Exception as e:
    print(f"Warning: RAG initialization failed: {e}")
