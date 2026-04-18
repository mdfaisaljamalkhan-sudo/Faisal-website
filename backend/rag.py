import os
import chromadb
from sentence_transformers import SentenceTransformer
from knowledge import FAISAL_KNOWLEDGE

chroma_data_dir = os.environ.get("CHROMA_DATA_DIR", "./chroma_data")
chroma_client = chromadb.PersistentClient(path=chroma_data_dir)
embedder = SentenceTransformer("all-MiniLM-L6-v2")


def chunk_knowledge() -> list[str]:
    """Split FAISAL_KNOWLEDGE into semantic chunks by section and Q&A pairs."""
    chunks = []

    for section in FAISAL_KNOWLEDGE.split("==="):
        section = section.strip()
        if not section:
            continue

        lines = section.split("\n")
        section_title = lines[0] if lines else ""

        if "Q:" in section:
            current_qa: list[str] = []
            for line in lines:
                if line.startswith("Q:") and len(current_qa) > 1:
                    chunk_text = "\n".join(current_qa).strip()
                    if "Q:" in chunk_text:
                        chunks.append(chunk_text)
                    current_qa = []
                current_qa.append(line)
            if current_qa:
                chunk_text = "\n".join(current_qa).strip()
                if chunk_text:
                    chunks.append(chunk_text)
        else:
            current_chunk = [section_title]
            current_length = len(section_title)

            for line in lines[1:]:
                current_chunk.append(line)
                current_length += len(line)

                if (line.strip().startswith("-") and current_length > 300) or current_length > 800:
                    chunk_text = "\n".join(current_chunk).strip()
                    if chunk_text:
                        chunks.append(chunk_text)
                    current_chunk = [section_title]
                    current_length = len(section_title)

            if len(current_chunk) > 1:
                chunk_text = "\n".join(current_chunk).strip()
                if chunk_text:
                    chunks.append(chunk_text)

    return chunks


def initialize_rag():
    """Initialize or verify RAG vector database."""
    try:
        collection = chroma_client.get_collection(name="faisal_knowledge")
        print(f"✓ RAG database loaded ({collection.count()} chunks)")
        return
    except Exception:
        pass

    print("Initializing RAG database...")
    collection = chroma_client.create_collection(name="faisal_knowledge")
    chunks = chunk_knowledge()

    ids = [f"chunk_{i}" for i in range(len(chunks))]
    embeddings = [embedder.encode(c).tolist() for c in chunks]
    metadatas = [{"source": "knowledge.py", "chunk": i} for i in range(len(chunks))]

    collection.add(ids=ids, embeddings=embeddings, documents=chunks, metadatas=metadatas)
    print(f"✓ RAG database initialized with {len(chunks)} chunks")


def retrieve_context(query: str, top_k: int = 3) -> str:
    """Retrieve relevant knowledge chunks for a query."""
    collection = chroma_client.get_collection(name="faisal_knowledge")
    query_embedding = embedder.encode(query).tolist()

    results = collection.query(query_embeddings=[query_embedding], n_results=top_k)

    if results["documents"] and results["documents"][0]:
        return "\n---\n".join(results["documents"][0])
    return ""


def build_rag_prompt(user_message: str, retrieved_context: str) -> str:
    """Build a prompt with retrieved context."""
    if retrieved_context:
        return f"""Based on the following information about Faisal:

{retrieved_context}

---

Answer this question: {user_message}"""
    return user_message
