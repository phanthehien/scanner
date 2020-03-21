import React from "react"
import moment from 'moment'
import {
  Label,
  List,
  Icon,
} from "semantic-ui-react"

const colors = {
  'HIGH': 'orange',
  'AVERAGE': 'olive',
  'LOW': 'teal'
}

const icons = {
  'HIGH': 'exclamation triangle',
  'AVERAGE': 'exclamation circle',
  'LOW': 'exclamation'
}

const labels = {
  'Queued': 'Queue at',
  'In Progress': 'Start processing at',
  'Success': 'Finished at',
  'Failure': 'Failed at'
}

const statusFields = {
  'Queued': 'queuedAt',
  'In Progress': 'scanningAt',
  'Success': 'finishedAt',
  'Failure': 'finishedAt',
};

export const getLabelTime = (data) => {
  const { status } = data
  const time = data[statusFields[status]]
  const label = labels[status]

  const labelTime = moment(time).format('DD/MM/YY HH:mm:ss')
  return `${label}: ${labelTime}`
}

export const FindingsLabel = ({ findings = [] }) => {

  return (
    <Label>
      { findings.length }
      <Label.Detail> Findings </Label.Detail>
    </Label>
  )
}

export const Finding = ({ finding }) => {
  const { ruleId, metadata: { description, severity } } = finding
  const color = colors[severity]
  const icon = icons[severity]

  return (
    <List.Item key={ruleId}>
      <Label color={color}>
        <Icon name={icon} /> 
        { description } 
        <Label.Detail> { severity} </Label.Detail>
      </Label>
    </List.Item>
  )
}