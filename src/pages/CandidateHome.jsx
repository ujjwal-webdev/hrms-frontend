import React from 'react'

export default function CandidateHome() {

  const renderForm = () => {
    switch(selectedFeature)
    {
      case 'sdfs':
        return null

      default:
        return null
    }
  }
  return (
    <div>
      Hello Candidate
      {renderForm()}
    </div>
  )
}
