import axios from "axios"

export const convertBlobToBinary = async (content) => {
    content.blocks.map( async (block, index) => {
        if (block.type == "image") {
            let blobUrl = block.data.url
            const blobData = await fetch(blobUrl).then(blob =>blob.blob())
            // blobData = await blobData.blob()
                var reader = new FileReader()
                reader.readAsDataURL(blobData)
                reader.onloadend = function(){
                    content.blocks[index].data.url = reader.result
                    // console.log("hello", reader.result)
                }
         
        }
    })

    // console.log({tempArray})
    // content.blocks.map( (block, index) => {
    //     if (block.type == "image") {
    //         let blobUrl = block.data.url

    //         fetch(blobUrl).then(response => {
    //             return response.blob()
    //         }).then(result => {
    //             var reader = new FileReader()
    //             reader.readAsDataURL(result)
    //             reader.onloadend = function(){
    //                 content.blocks[index].data.url = reader.result
    //             }
    //         })
    //     }
    // })


}

