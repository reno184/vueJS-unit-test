export interface api {
  get : {
    userId : number
    id : number
    title : string
    body : string
  },
  body : {
    put : {},
    post : {}
  }
}

export interface post {
  userId : number
  id : number
  title : string
  imgUrl : string
  body : string
}
