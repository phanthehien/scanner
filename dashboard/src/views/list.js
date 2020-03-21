import React from "react";
import { useState, useEffect } from "react";
import { withRouter, Link } from 'react-router-dom'

import {
  Grid,
  Header,
  Card,
  Loader,
} from "semantic-ui-react";

import { listScanResult } from '../api';
import ScanResultRow from '../components/scanResultRow';

const renderScanResultRow = (item, index) => (
  <Link key={`row${index}`} to={`/result/${item._id}`} style={{ padding: '10px' }}>
    <ScanResultRow data={item} />
  </Link>
);

const ListScanResult = () => {
  let [scanResults, setScanResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const list = async () => {
      setLoading(true)
      const response = await listScanResult()
      setLoading(false)
      setScanResults(response.data)
    };
    list();
  }, [])

  return (
  <Grid style={{ height: '50vh' }}>
    <Grid.Column style={{ margin: "0 auto" }}>
      <Header as='h2' color='teal' textAlign='center'>
        Scan Results
      </Header>
      { 
        loading ?  <Loader active />:
        <Card.Group itemsPerRow={4}>
          { 
            scanResults && scanResults.map(renderScanResultRow)
          }
        </Card.Group>
        }
    </Grid.Column>
  </Grid>
  )
}

export default withRouter(ListScanResult);