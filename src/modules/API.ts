import Axios from 'axios'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/'

class API {
  // 서버 주소에 따라 변경
  private API_URI = API_BASE_URL
  private method = 'GET'

  async CALL({ method = this.method, url = '', data = null, ...args }) {
    const service = Axios({
      ...args,
      method,
      url: this.API_URI + url,
      data,
      headers: {
        Authorization: `Bearer ${'token'}`,
      },
    })

    service.then((res) => {
      if (res.data.error) return console.error(res.data.error)
      if (args.isSuccessMessage) {
        alert('성공적으로 실행되었습니다.')
      }
    })

    service.catch((error) => {
      // return apiErrolNotification(error);
      alert({
        message: `Error CODE: ${error.response.data.error.code}`,
        description: `${error.response.data.error.message}`,
      })
    })

    return service
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  GET(url: string, ...args) {
    return this.CALL({
      url,
      method: 'GET',
      ...args[0],
    })
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  POST(url: string, data = null, ...args) {
    return this.CALL({
      url,
      method: 'POST',
      data,
      ...args[0],
    })
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  PATCH(url, data = null, ...args) {
    return this.CALL({
      url,
      method: 'PATCH',
      data,
      ...args[0],
    })
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  PUT(url: string, data = null, ...args) {
    return this.CALL({
      url,
      method: 'PUT',
      data,
      ...args[0],
    })
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  DELETE(url: string, ...args) {
    return this.CALL({
      url,
      method: 'DELETE',
      ...args[0],
    })
  }
}

export default new API()

export const baseAxios = (url: string) => {
  return Axios.get(url, {
    headers: {
      Authorization: `Bearer ${'token'}`,
    },
  })
}
