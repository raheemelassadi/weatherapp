export default function timeConverter(unixTime){
    const date = new Date(unixTime*1000)
    return date.toLocaleDateString("en-us")
}

