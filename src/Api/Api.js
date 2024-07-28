import axios from "axios"

export const getWikiepedia = async () => {
    axios.defaults.baseURL = process.env.REACT_APP_APIURL
    try{
        const config = {
            method: "GET",
            params:{
                action: "query",
                format: "json",
                origin:"*",
                generator: "random",
                grnnamespace: "0",
                prop:"revisions|images",
                rvprop:"content",
                grnlimit: "1"
            },
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const response = await axios(config);
        return response.data;
    }catch (error) {
        console.error(error);
        return []
    }
}

export const getWikiContent=async(data)=>{
    axios.defaults.baseURL = process.env.REACT_APP_APIURL
    try{
        const config = {
            method: "GET",
            params:{
                action: "query",
                format: "json",
                prop:"extracts",
                exintro:1,
                explaintext:1,
                redirects:1,
                pageids:data,
                origin:"*",
            },
            headers: {
                'Content-Type': 'application/json' 
            }
        }
        const response = await axios(config);
        return response.data;
    }catch (error) {
        console.error(error);
        return []
    }
}