import React from "react"
import {
  Grid,
  Header,
  Table,
  Loader,
} from "semantic-ui-react"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { colors } from '../components/findings'
import { getScanResult } from '../api'

const Severities = Object.keys(colors)

const renderRow = (finding, index) => {
  const { 
    type, 
    ruleId, 
    location: { path, positions: { begin: { line }}}, 
    metadata: { description, severity } 
  } = finding;

  return (
    <Table.Row key={`${type}_${index}`}>
      <Table.Cell singleLine>
        <Header as='h5' textAlign='center'>
          { ruleId }
        </Header>
      </Table.Cell>
      <Table.Cell> { description } </Table.Cell>
      <Table.Cell
        negative={Severities[0] === severity}
        warning={Severities[1] === severity}
        positive={Severities[2] === severity}
        > 
        <Header as='h4' color={colors[severity]} textAlign='center'>
          { severity }
        </Header>
      </Table.Cell>
      <Table.Cell singleLine> { path }:{ line }</Table.Cell>
    </Table.Row>
  )
}

const ShowFindings = () => {
  let [scanResult, setScanResult] = useState()
  const [loading, setLoading] = useState(false)

  const { id } = useParams();

  useEffect(() => {
    const getResult = async () => {
      try {
        setLoading(true)
        const response = await getScanResult(id)
        setLoading(false)
        setScanResult(response.data)
      } catch (err) {
        setLoading(false)
      }
    };
    getResult();
  }, [id])

  return (
  <Grid style={{ height: '50vh' }}>
    <Grid.Column style={{ margin: "0 auto" }}>
      <Header as='h3' color='teal' textAlign='center'>
        Findings of: { scanResult && scanResult.repositoryName }
      </Header>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>RuleId</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Severity</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { 
            loading ? 
              <Table.Row rowSpan="2">
                <Table.Cell colSpan="4" textAlign='center'>
                  <Loader active inline /> 
                </Table.Cell>
              </Table.Row> :
              (scanResult && scanResult.findings.map(renderRow))
          }
        </Table.Body>
      </Table>
    </Grid.Column>
  </Grid>
  )
}

export default ShowFindings;