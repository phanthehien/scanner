import React from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Label,
} from "semantic-ui-react";

function App() {
  return (
  <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Submit scan result
      </Header>
      <Form size='large'>
          <Segment raised textAlign="left">
            <Label attached="top left">
                Please enter all fields
            </Label>
            <Form.Field>  
              <Form.Input icon='github' iconPosition='left' placeholder='Repository name' />
            </Form.Field>
            <Form.TextArea rows="15" placeholder="Findings" />
            <Button color='teal' fluid size='large'>
              Submit
            </Button>
          </Segment>
      </Form>
    </Grid.Column>
  </Grid>
  )
}

export default App;
