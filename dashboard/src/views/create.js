import React from "react"
import { useState } from "react"
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Label,
  Modal,
  Icon,
  Dropdown
} from "semantic-ui-react"

import { createScanResult } from '../api'

const statuses = ['Queued', 'In Progress', 'Success', 'Failure']

const stateOptions = statuses.map(status => ({
  key: status,
  text: status,
  value: status,
}))

const CreateScanResult = () => {
  const [repositoryName, setRepositoryName] = useState('')
  const [findings, setFindings] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stateOption, setStateOption] = useState()

  const isValidJson = () => {
    if (findings) {
      try {
        JSON.parse(findings);
      } catch (e) {
        return false;
      }
      return true;
    }

    return true
  }

  const closeModal = () => {
    setOpen(false)
    setRepositoryName('')
    setFindings('')
    setStateOption('')
  }

  const create = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = { repositoryName, findings, status: stateOption }
      const response = await createScanResult(data)
      setLoading(false)

      if (response.data) {
        setOpen(true)
      }
    } catch (err) {
      setLoading(false)
    }
  }

  return (
  <Grid style={{ height: '50vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450, margin: "0 auto" }}>
      <Header as='h2' color='teal' textAlign='center'>
        Submit scan result
      </Header>
      <Form size='large'>
          <Segment raised textAlign="left">
            <Label attached="top left">
                Please enter all fields
            </Label>
            <Form.Field>  
              <Form.Input
                focus
                icon='github' 
                iconPosition='left' 
                placeholder='Input repository name' 
                value={repositoryName}
                onChange={e => setRepositoryName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                fluid
                icon='fork'
                labeled
                button
                className='icon'
                value={stateOption}
                options={stateOptions} 
                placeholder="Select status"
                onChange={(_, data) => setStateOption(data.value)}
              />
            </Form.Field>
            <Form.TextArea 
              error={!isValidJson()}
              rows="15" 
              placeholder="Input findings in json format" 
              value={findings}
              onChange={e => setFindings(e.target.value)}
            />
            <Button
              disabled={!(isValidJson() && !!repositoryName)}
              loading={loading}
              color='teal' 
              fluid size='large'
              onClick={create}
            >
              Submit
            </Button>
            <Modal open={open} size="mini">
              <Modal.Header>
                New Scan Result                
              </Modal.Header>
              <Modal.Content>
                New record has been created.
              </Modal.Content>
              <Modal.Actions>
                <Button color='teal' onClick={closeModal}>
                  <Icon name='checkmark' /> Close
                </Button>
              </Modal.Actions>
            </Modal>
          </Segment>
      </Form>
    </Grid.Column>
  </Grid>
  )
}

export default CreateScanResult;