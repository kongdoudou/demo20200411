import axios from 'axios'
export function getData() {
  return axios.get('http://lequ-qfe.iqiyi.com/api/nc/recommend/resources/30257742212?pageParam=%7B%22device_id%22%3A%220%22%2C%22ip%22%3A%22%22%2C%22platform%22%3A%22H5_QIYI%22%2C%22uid%22%3A1242627550%2C%22page_num%22%3A2%2C%22page_size%22%3A6%7D')
}

