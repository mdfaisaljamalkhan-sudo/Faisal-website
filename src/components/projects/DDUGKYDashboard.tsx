import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'

const performanceData = [
  {
    fiscal_year: 'FY 2016-17',
    training_target: 1338,
    training_achievement: 1442,
    placement_target: 957,
    placement_achievement: 755,
  },
  {
    fiscal_year: 'FY 2017-18',
    training_target: 1561,
    training_achievement: 1116,
    placement_target: 1093,
    placement_achievement: 695,
  },
]

const performancePercentage = [
  {
    fiscal_year: 'FY 2016-17',
    training_rate: 107,
    placement_rate: 78,
  },
  {
    fiscal_year: 'FY 2017-18',
    training_rate: 71,
    placement_rate: 63,
  },
]

const programSteps = [
  { step: 1, name: 'Survey', color: '#2D6BE4' },
  { step: 2, name: 'Mobilization', color: '#2D6BE4' },
  { step: 3, name: 'Counselling', color: '#2D6BE4' },
  { step: 4, name: 'Token Generation', color: '#A09AAB' },
  { step: 5, name: 'Training', color: '#2D6BE4' },
  { step: 6, name: 'OJT', color: '#A09AAB' },
  { step: 7, name: 'Placement', color: '#2D6BE4' },
]

const recommendations = [
  {
    area: 'Survey & Mobilization',
    insight:
      'Leveraging student interns from universities and NCC/NSS organizations reduces staffing burden while addressing rural reach challenges.',
    impact: 'High',
  },
  {
    area: 'Counselling Sessions',
    insight:
      'Implementing structured engagement activities and field visualization reduces trainee dropout rates and improves trade alignment.',
    impact: 'High',
  },
  {
    area: 'Training Quality',
    insight:
      'Balancing theoretical knowledge with soft skills development and confidence-building improves performance and employer credibility.',
    impact: 'Very High',
  },
  {
    area: 'Performance Optimization',
    insight: 'Block saturation strategy with focused SHG mobilization improves retention and enrollment quality.',
    impact: 'Medium',
  },
]

export function DDUGKYDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="space-y-8"
    >
      {/* Context */}
      <motion.div variants={itemVariants} className="bg-[#EEF3FD] border border-[#2D6BE4] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">Research Context</h3>
        <p className="text-sm text-[#6B6375]">
          Research intern at ORMAS (Department of Panchayati Raj, Government of Odisha).
          Analyzed DDU-GKY implementation across survey, mobilization, counselling, and training phases
          with field observations from multiple training centers and counseling camps.
        </p>
      </motion.div>

      {/* Performance Analytics */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Performance Analytics</h3>

        {/* Achievement Rate Trend */}
        <div className="bg-white border border-[#E8E5E0] rounded-lg p-6 mb-6">
          <h4 className="text-base font-semibold text-[#1A1A1A] mb-4">Achievement Rate Trend (%)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performancePercentage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E5E0" />
              <XAxis dataKey="fiscal_year" stroke="#6B6375" />
              <YAxis stroke="#6B6375" label={{ value: 'Achievement %', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FAF9F6',
                  border: '1px solid #E8E5E0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="training_rate"
                stroke="#2D6BE4"
                name="Training Achievement %"
                strokeWidth={2}
                dot={{ fill: '#2D6BE4', r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="placement_rate"
                stroke="#6B6375"
                name="Placement Achievement %"
                strokeWidth={2}
                dot={{ fill: '#6B6375', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#A09AAB] mt-3">
            Key Finding: Training targets exceeded in FY 2016-17 (107%) but declined to 71% in FY 2017-18.
            Placement achievement dropped from 78% to 63%, indicating scaling challenges.
          </p>
        </div>

        {/* Absolute Numbers Comparison */}
        <div className="bg-white border border-[#E8E5E0] rounded-lg p-6">
          <h4 className="text-base font-semibold text-[#1A1A1A] mb-4">Target vs Achievement (Absolute Numbers)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E5E0" />
              <XAxis dataKey="fiscal_year" stroke="#6B6375" />
              <YAxis stroke="#6B6375" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FAF9F6',
                  border: '1px solid #E8E5E0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="training_target" fill="#EEF3FD" name="Training Target" />
              <Bar dataKey="training_achievement" fill="#2D6BE4" name="Training Achievement" />
              <Bar dataKey="placement_target" fill="#F2F0EB" name="Placement Target" />
              <Bar dataKey="placement_achievement" fill="#6B6375" name="Placement Achievement" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Program Flow */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">DDU-GKY Implementation Pipeline</h3>
        <div className="bg-white border border-[#E8E5E0] rounded-lg p-6">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            {programSteps.map((step, i) => (
              <div key={step.step} className="flex items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: step.color }}
                >
                  {step.step}
                </div>
                <div className="ml-2 text-sm font-medium text-[#1A1A1A]">{step.name}</div>
                {i < programSteps.length - 1 && (
                  <div className="ml-3 w-8 h-0.5 bg-[#E8E5E0]" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-[#EEF3FD] rounded border border-[#2D6BE4]">
            <p className="text-xs text-[#6B6375]">
              <span className="font-semibold text-[#2D6BE4]">Analysis Focus:</span> This research deeply examined the first 4 steps (Survey,
              Mobilization, Counselling, Training) with field observations and strategic recommendations for improvement.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Key Insights & Recommendations */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Strategic Recommendations</h3>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div
              key={i}
              className="bg-white border border-[#E8E5E0] rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-[#1A1A1A] text-sm">{rec.area}</h4>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    rec.impact === 'Very High'
                      ? 'bg-red-100 text-red-700'
                      : rec.impact === 'High'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {rec.impact} Impact
                </span>
              </div>
              <p className="text-xs text-[#6B6375] leading-relaxed">{rec.insight}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Research Highlights */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Field Research Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-[#E8E5E0] rounded-lg p-5">
            <h4 className="font-semibold text-[#1A1A1A] text-sm mb-2">Field Visits Conducted</h4>
            <ul className="text-xs text-[#6B6375] space-y-1">
              <li>• Nemalo Counseling Camp (28 June 2018)</li>
              <li>• Garudagaon Counseling Camp</li>
              <li>• PIA Ozone Pharmaceuticals</li>
              <li>• PIA ASMACS</li>
            </ul>
          </div>
          <div className="bg-white border border-[#E8E5E0] rounded-lg p-5">
            <h4 className="font-semibold text-[#1A1A1A] text-sm mb-2">Key Findings</h4>
            <ul className="text-xs text-[#6B6375] space-y-1">
              <li>• Soft skills gap in retail/hospitality trades</li>
              <li>• High trainee dropout rates (need reduction)</li>
              <li>• Candidate participation concerns in counseling</li>
              <li>• Scaling challenges across fiscal years</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Executive Summary KPIs */}
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Executive Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Trained (Both FY)', value: '2,558', suffix: 'candidates' },
            { label: 'Total Placed (Both FY)', value: '1,450', suffix: 'candidates' },
            { label: 'Avg Placement Rate', value: '70.5%', suffix: '' },
            { label: 'Drop in FY18 Performance', value: '-36%', suffix: 'training rate' },
          ].map((kpi, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#EEF3FD] to-[#F2F0EB] border border-[#2D6BE4] rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-[#2D6BE4] mb-1">{kpi.value}</div>
              <div className="text-xs font-medium text-[#6B6375]">{kpi.label}</div>
              {kpi.suffix && <div className="text-xs text-[#A09AAB] mt-1">{kpi.suffix}</div>}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
