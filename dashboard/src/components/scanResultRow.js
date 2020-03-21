import React from "react"
import {
  Card,
} from "semantic-ui-react"

import { FindingsLabel, getLabelTime } from './findings'

const ScanResultRow = ({ data }) => {
  const { repositoryName, findings } = data

  return (
    <Card key={repositoryName}>
      <Card.Content header={repositoryName} />
      <Card.Content description={getLabelTime(data)} />
      <Card.Content extra>
        <FindingsLabel findings={findings} />
      </Card.Content>
    </Card>
  );
}

export default ScanResultRow