import React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Label,
  Modal,
  Icon,
} from "semantic-ui-react";

import { createScanResult } from '../api';

const CreateScanResult = () => {
  const [repositoryName, setRepositoryName] = useState('')
  const [findings, setFindings] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const create = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = { repositoryName, findings }
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
                placeholder='Repository name' 
                value={repositoryName}
                onChange={e => setRepositoryName(e.target.value)}
              />
            </Form.Field>
            <Form.TextArea 
              error={!isValidJson()}
              rows="15" 
              placeholder="Findings" 
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
                <Button color='teal' onClick={() => setOpen(false)}>
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