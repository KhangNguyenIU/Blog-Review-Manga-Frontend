import axios from "axios"

export const convertBlobToBinary = async (content) => {
    
    // console.log({tempArray})
    content.blocks.map( (block, index) => {
        if (block.type == "image") {
            let blobUrl = block.data.url

            fetch(blobUrl).then(response => {
                return response.blob()
            }).then(result => {
                var reader = new FileReader()
                reader.readAsDataURL(result)
                reader.onloadend = function(){
                    content.blocks[index].data.url = reader.result
                }
            })
        }
    })
}

