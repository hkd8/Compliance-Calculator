import React, { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Salary data by region and role
const SALARY_DATA = {
  'North America': { analyst: 85000, investigator: 95000 },
  'Europe': { analyst: 70000, investigator: 80000 },
  'Asia Pacific': { analyst: 55000, investigator: 65000 },
  'Latin America': { analyst: 45000, investigator: 55000 },
  'Middle East & Africa': { analyst: 50000, investigator: 60000 }
}

// Calculation engine
const calculateSavings = (inputs) => {
  const salaryData = SALARY_DATA[inputs.region] || SALARY_DATA['North America']
  const analystSalary = inputs.analystSalary || salaryData.analyst
  const investigatorSalary = inputs.investigatorSalary || salaryData.investigator

  // Current costs
  const currentAnalystCost = inputs.analystCount * analystSalary
  const currentInvestigatorCost = inputs.investigatorCount * investigatorSalary
  const totalCurrentCost = currentAnalystCost + currentInvestigatorCost

  // Calculate savings for each initiative
  const initiatives = []

  // 1. Risk Engine Optimization
  const falsePositiveReduction = inputs.falsePositiveReduction / 100
  const alertReduction = inputs.dailyAlerts * falsePositiveReduction
  const timePerAlert = inputs.avgProcessingTime / 60 // Convert to hours
  const dailyTimeSaved1 = alertReduction * timePerAlert
  const fteSaved1 = (dailyTimeSaved1 * 250) / (8 * 250) // 250 working days
  const savings1 = fteSaved1 * analystSalary

  initiatives.push({
    name: 'Risk Engine Optimization',
    savings: savings1,
    fteSaved: fteSaved1,
    timeline: 'Year 1'
  })

  // 2. Process Automation
  const timeSavedPerCase = inputs.timeSavingsPerCase / 60 // Convert to hours
  const dailyTimeSaved2 = inputs.dailyCases * timeSavedPerCase
  const fteSaved2 = (dailyTimeSaved2 * 250) / (8 * 250)
  const savings2 = fteSaved2 * investigatorSalary

  initiatives.push({
    name: 'Process Automation',
    savings: savings2,
    fteSaved: fteSaved2,
    timeline: 'Year 1-2'
  })

  // 3. Tool Consolidation (10% efficiency gain)
  const toolEfficiencyGain = 0.10
  const fteSaved3 = (inputs.analystCount + inputs.investigatorCount) * toolEfficiencyGain
  const savings3 = (inputs.analystCount * toolEfficiencyGain * analystSalary) + 
                   (inputs.investigatorCount * toolEfficiencyGain * investigatorSalary)

  initiatives.push({
    name: 'Tool Consolidation',
    savings: savings3,
    fteSaved: fteSaved3,
    timeline: 'Year 2'
  })

  // 4. AI-Assisted Workflows (8 minutes per case)
  const aiTimeSaved = 8 / 60 // 8 minutes in hours
  const dailyTimeSaved4 = inputs.dailyCases * aiTimeSaved
  const fteSaved4 = (dailyTimeSaved4 * 250) / (8 * 250)
  const savings4 = fteSaved4 * investigatorSalary

  initiatives.push({
    name: 'AI-Assisted Workflows',
    savings: savings4,
    fteSaved: fteSaved4,
    timeline: 'Year 2-3'
  })

  // 5. Continuous Learning (additional 20% improvement)
  const continuousLearningGain = 0.20
  const additionalAlertReduction = inputs.dailyAlerts * continuousLearningGain
  const dailyTimeSaved5 = additionalAlertReduction * timePerAlert
  const fteSaved5 = (dailyTimeSaved5 * 250) / (8 * 250)
  const savings5 = fteSaved5 * analystSalary

  initiatives.push({
    name: 'Continuous Learning',
    savings: savings5,
    fteSaved: fteSaved5,
    timeline: 'Year 3'
  })

  const totalSavings = initiatives.reduce((sum, init) => sum + init.savings, 0)
  const totalFteSaved = initiatives.reduce((sum, init) => sum + init.fteSaved, 0)
  const roi = (totalSavings / totalCurrentCost) * 100
  const paybackMonths = Math.ceil((totalCurrentCost * 0.1) / (totalSavings / 12)) // Assuming 10% implementation cost

  // Timeline data for chart
  const timelineData = [
    { year: 'Current', savings: 0, cumulative: 0 },
    { year: 'Year 1', savings: savings1 + savings2 * 0.5, cumulative: savings1 + savings2 * 0.5 },
    { year: 'Year 2', savings: savings2 * 0.5 + savings3 + savings4 * 0.5, cumulative: savings1 + savings2 + savings3 + savings4 * 0.5 },
    { year: 'Year 3', savings: savings4 * 0.5 + savings5, cumulative: totalSavings }
  ]

  return {
    totalSavings,
    annualSavings: totalSavings / 3,
    totalFteSaved,
    roi,
    paybackMonths,
    initiatives,
    timelineData,
    currentCost: totalCurrentCost
  }
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [inputs, setInputs] = useState({
    // Company Profile
    companySize: 'Large (1000+ employees)',
    industry: 'Crypto/Blockchain',
    region: 'North America',
    maturity: 'Intermediate',
    
    // Operations Metrics
    dailyAlerts: 500,
    avgProcessingTime: 20,
    falsePositiveRate: 40,
    dailyCases: 150,
    avgInvestigationTime: 2,
    escalationRate: 25,
    
    // Staffing & Costs
    analystCount: 10,
    analystSalary: 85000,
    investigatorCount: 8,
    investigatorSalary: 95000,
    technologyCosts: 100000,
    trainingCosts: 50000,
    
    // Improvement Targets
    falsePositiveReduction: 30,
    timeSavingsPerCase: 15,
    implementationTimeline: '2 years'
  })
  
  const [results, setResults] = useState(null)
  
  const steps = [
    'Company Profile',
    'Operations Metrics', 
    'Staffing & Costs',
    'Elliptic Benchmarks'
  ]
  
  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Calculate results
      const calculatedResults = calculateSavings(inputs)
      setResults(calculatedResults)
      setShowResults(true)
    }
  }
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const handleReset = () => {
    setCurrentStep(0)
    setShowResults(false)
    setResults(null)
  }
  
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    } else {
      return `$${amount.toFixed(0)}`
    }
  }
  
  if (showResults && results) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Compliance Savings Analysis</h1>
            <p className="text-xl text-gray-600">Projected efficiency gains over 3 years</p>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-medium text-cyan-500 mb-2">Total 3-Year Savings</h3>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(results.totalSavings)}</div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-medium text-cyan-500 mb-2">Annual Savings</h3>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(results.annualSavings)}</div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-medium text-cyan-500 mb-2">ROI</h3>
              <div className="text-3xl font-bold text-gray-900">{results.roi.toFixed(0)}%</div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-medium text-cyan-500 mb-2">Payback Period</h3>
              <div className="text-3xl font-bold text-gray-900">{results.paybackMonths} months</div>
            </div>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Savings Timeline */}
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-2">Cumulative Savings Timeline</h3>
              <p className="text-gray-600 mb-4">Projected savings accumulation over 3 years</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={results.timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="cumulative" stroke="#00E0E0" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Initiative Breakdown */}
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-2">Savings by Initiative</h3>
              <p className="text-gray-600 mb-4">Breakdown of savings by optimization area</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={results.initiatives}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="savings" fill="#00E0E0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Detailed Breakdown */}
          <div className="bg-gray-50 p-6 rounded-lg border mb-8">
            <h3 className="text-xl font-bold mb-4">Detailed Initiative Analysis</h3>
            <div className="space-y-6">
              {results.initiatives.map((initiative, index) => (
                <div key={index} className="border-l-4 border-cyan-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold">{initiative.name}</h4>
                    <span className="bg-gray-200 px-2 py-1 rounded text-sm">{initiative.timeline}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Annual Savings:</span>
                      <div className="text-xl font-bold text-green-600">{formatCurrency(initiative.savings)}</div>
                    </div>
                    <div>
                      <span className="font-medium">FTE Impact:</span>
                      <div className="text-xl font-bold text-blue-600">{initiative.fteSaved.toFixed(1)} FTE</div>
                    </div>
                    <div>
                      <span className="font-medium">Implementation:</span>
                      <div className="text-lg font-medium text-gray-700">{initiative.timeline}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleReset} 
              className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
            >
              New Calculation
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Compliance Efficiency Calculator</h1>
            <span className="bg-gray-200 px-3 py-1 rounded text-sm">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step, index) => (
              <div key={index} className={`text-sm font-medium ${index <= currentStep ? 'text-cyan-500' : 'text-gray-400'}`}>
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-cyan-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Form Steps */}
        <div className="bg-gray-50 p-6 rounded-lg border mb-6">
          <h2 className="text-xl font-bold mb-2">{steps[currentStep]}</h2>
          <p className="text-gray-600 mb-6">
            {currentStep === 0 && "Tell us about your organization"}
            {currentStep === 1 && "Current compliance operations metrics"}
            {currentStep === 2 && "Staffing and cost information"}
            {currentStep === 3 && "Review Elliptic's proven improvement benchmarks"}
          </p>
          
          {/* Step 1: Company Profile */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Size</label>
                  <select 
                    value={inputs.companySize} 
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="Small (<100 employees)">Small (&lt;100 employees)</option>
                    <option value="Medium (100-1000 employees)">Medium (100-1000 employees)</option>
                    <option value="Large (1000+ employees)">Large (1000+ employees)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Industry Sector</label>
                  <select 
                    value={inputs.industry} 
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="Financial Services">Financial Services</option>
                    <option value="Crypto/Blockchain">Crypto/Blockchain</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Geographic Region</label>
                  <select 
                    value={inputs.region} 
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Latin America">Latin America</option>
                    <option value="Middle East & Africa">Middle East & Africa</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Compliance Maturity</label>
                  <select 
                    value={inputs.maturity} 
                    onChange={(e) => handleInputChange('maturity', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Operations Metrics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Alert Processing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Daily Alerts</label>
                    <input
                      type="number"
                      value={inputs.dailyAlerts}
                      onChange={(e) => handleInputChange('dailyAlerts', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Avg Processing Time (minutes)</label>
                    <input
                      type="number"
                      value={inputs.avgProcessingTime}
                      onChange={(e) => handleInputChange('avgProcessingTime', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">False Positive Rate (%)</label>
                    <input
                      type="number"
                      value={inputs.falsePositiveRate}
                      onChange={(e) => handleInputChange('falsePositiveRate', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="40"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Case Investigation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Daily Cases</label>
                    <input
                      type="number"
                      value={inputs.dailyCases}
                      onChange={(e) => handleInputChange('dailyCases', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Avg Investigation Time (hours)</label>
                    <input
                      type="number"
                      value={inputs.avgInvestigationTime}
                      onChange={(e) => handleInputChange('avgInvestigationTime', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">L1→L2 Escalation Rate (%)</label>
                    <input
                      type="number"
                      value={inputs.escalationRate}
                      onChange={(e) => handleInputChange('escalationRate', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="25"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Staffing & Costs */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">L1 Analysts (Transaction Monitoring)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of FTEs</label>
                    <input
                      type="number"
                      value={inputs.analystCount}
                      onChange={(e) => handleInputChange('analystCount', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Average Annual Salary ($)</label>
                    <input
                      type="number"
                      value={inputs.analystSalary}
                      onChange={(e) => handleInputChange('analystSalary', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="85000"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">L2 Investigators (Case Investigation)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of FTEs</label>
                    <input
                      type="number"
                      value={inputs.investigatorCount}
                      onChange={(e) => handleInputChange('investigatorCount', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="8"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Average Annual Salary ($)</label>
                    <input
                      type="number"
                      value={inputs.investigatorSalary}
                      onChange={(e) => handleInputChange('investigatorSalary', parseInt(e.target.value) || 0)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="95000"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Improvement Targets */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Introduction to Elliptic Benchmarks */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-lg">ℹ</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Elliptic's Proven Benchmarks</h4>
                    <p className="text-sm text-gray-600">
                      The default targets below are based on <strong>real improvements achieved by Elliptic clients</strong>. 
                      These conservative estimates reflect actual results from our compliance optimization implementations. 
                      You can adjust these targets based on your specific goals.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  False Positive Reduction Target: <span className="font-bold text-cyan-500">{inputs.falsePositiveReduction}%</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  <strong>Elliptic Default: 30%</strong> - Based on proven results from advanced risk engine implementations
                </p>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={inputs.falsePositiveReduction}
                  onChange={(e) => handleInputChange('falsePositiveReduction', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Conservative (10%)</span>
                  <span className="text-cyan-500 font-medium">Elliptic Benchmark (30%)</span>
                  <span>Optimistic (60%)</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Time Savings Per Case Target: <span className="font-bold text-cyan-500">{inputs.timeSavingsPerCase} minutes</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  <strong>Elliptic Default: 15 minutes</strong> - Average time saved per case through process automation and tooling improvements
                </p>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={inputs.timeSavingsPerCase}
                  onChange={(e) => handleInputChange('timeSavingsPerCase', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Conservative (5 min)</span>
                  <span className="text-cyan-500 font-medium">Elliptic Benchmark (15 min)</span>
                  <span>Optimistic (30 min)</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Implementation Timeline</label>
                <p className="text-xs text-gray-500 mb-3">
                  <strong>Elliptic Default: 2 years</strong> - Typical phased rollout for comprehensive compliance optimization
                </p>
                <select 
                  value={inputs.implementationTimeline} 
                  onChange={(e) => handleInputChange('implementationTimeline', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="6 months">6 months - Rapid deployment</option>
                  <option value="1 year">1 year - Accelerated rollout</option>
                  <option value="2 years">2 years - Elliptic recommended</option>
                  <option value="3 years">3 years - Gradual implementation</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg border ${currentStep === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            className="bg-cyan-500 text-white px-6 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Calculate Savings' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  )
}