import React from 'react'
import { AddEducationRow, Container } from '../Components'

const Education = () => {
  return (
    <Container>

          <div className="row flex-lg-nowrap bg-dark p-5 w-100">
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