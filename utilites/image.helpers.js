import axios from "axios"

export const convertBlobToBinary = async (content) => {
    let array = [...content.blocks]
    array.map( async (block, index) => {
        if (block.type == "image") {
            let blobUrl = block.data.url
            const blobData = await fetch(blobUrl).then(blob =>blob.blob())
                var reader = new FileReader()
                reader.readAsDataURL(blobData)
                reader.onloadend = function(){
                    array[index].data.url = reader.result
                }
        }
    })
    content.blocks = array
    return content
}

