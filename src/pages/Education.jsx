import React from 'react'
import { AddEducationRow, Container } from '../Components'

const Education = () => {
  return (
    <Container>

          <div className="row g-0 g-md-3 flex-lg-nowrap bg-dark p-2 p-md-5 w-100">
            <div className="col-12 col-md-8 mb-3">
              <AddEducationRow />
            </div>
            <div className='col-12 col-md-4'>
              <img src="images/education1.gif" className='w-100' alt="" />
            </div>
          </div>
        
    </Container>

  )
}

export default Education