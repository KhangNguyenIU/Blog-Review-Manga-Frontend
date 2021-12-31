import axios from "axios"

export const convertBlobToBinary = async (content) => {
    // console.log("content",content)
    let array = [...content.blocks]
    const unresolvedData = array.map(async (block, index) => {
        if (block.type === "image") {
            let blobUrl = block.data.url
            const blobData = await fetchBlog(blobUrl)
            if(blobData){
                var reader = new FileReader()
                reader.readAsDataURL(blobData)
                reader.onloadend = function () {
                    block.data.url = reader.result
                }
            }
        }
        return block
    })
    const result = await Promise.all(unresolvedData)
    if(result){
        content.blocks = result
        return content
    }
    return;
}

const fetchBlog = async (url) => {
    const blobData = await fetch(url).then(blob=>blob.blob())
    if (blobData)
        return blobData
}