import axios from 'axios'

const BaseUrl = 'http://localhost:8080'

export const createScanResult = async (scanResult) => {
  try {
    const payload = scanResult
    const url = `${BaseUrl}/result`

    const response = await axios.post(url, payload)
    const responseData = response.data;
    if (responseData.status === 'success') {
      return {
        data: responseData.data,
        error: null,
      }
    } else {
      return  { ...responseData }
    }
  } catch (err) {
    return {
      data: null,
      error: err
    }
  }
}

export const listScanResult = async () => {
  try {
    const url = `${BaseUrl}/result`
    
    const response = await axios.get(url)
    const responseData = response.data;

    if (responseData.status === 'success') {
      return {
        data: responseData.data,
        error: null,
      }
    } else {
      return  { ...responseData }
    }
  } catch (err) {
    return {
      data: null,
      error: err
    }
  }
}

export const getScanResult = async (id) => {
  try {
    const url = `${BaseUrl}/result/${id}`
    
    const response = await axios.get(url)
    const responseData = response.data;

    if (responseData.status === 'success') {
      return {
        data: responseData.data,
        error: null,
      }
    } else {
      return  { ...responseData }
    }
  } catch (err) {
    return {
      data: null,
      error: err
    }
  }
}