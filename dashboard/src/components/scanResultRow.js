import React from "react"
import {
  Card,
} from "semantic-ui-react"

import { FindingsLabel, getLabelTime, statusColors } from './findings'

const ScanResultRow = ({ data }) => {
  const { repositoryName, findings, status } = data

  return (
    <Card key={repositoryName} color={statusColors[status]} raised>
      <Card.Content>
        <Card.Header> { repositoryName} </Card.Header>
        <Card.Meta> { getLabelTime(data) } </Card.Meta> 
        <Card.Description>
          <FindingsLabel findings={findings} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default ScanResultRow