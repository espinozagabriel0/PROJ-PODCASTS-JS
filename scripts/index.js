console.log("Hola mundo")

fetch("xml-podcast.xml")
.then(response => response.text())
.then(data => {
    const parser = new DOMParser()
    const xml = parser.parseFromString(data, "application/xml")
    console.log(xml)

    //Buscamos dentro del xml los elementos necesarios 

    const posts = xml.querySelectorAll("post")
    console.log(posts)

    let cards = ''

    for (let i = 0; i < posts.length; i++) {
        let titulo = posts[i].getAttribute("titulo")
        let fecha = posts[i].getAttribute("fecha")
        let introduccion = posts[i].querySelector("introduccion").textContent
        let desc = posts[i].querySelector("descripcion").textContent
        let tiempoLectura = posts[i].querySelector("tiempo_lectura").textContent
        let visitas = posts[i].querySelector("num_visualizaciones").textContent
        let likes = posts[i].querySelector("num_megusta").textContent
        let numComentario = posts[i].querySelector("num_comentarios").textContent
        // let autor = posts[i].querySelector("avatar").textContent
        //imagen del post
        let autorNombre = posts[i].querySelector("nombre").textContent   
        let autorImagen = posts[i].querySelector("avatar").textContent
       
        // console.log("titulo: ", titulo, "\nfecha: ", fecha, "\ndesc: ", desc, "\ntiempoLectura: ", tiempoLectura, "\nvisitas: ", visitas, "\nlikes: ", likes, "\nAutor: ", autorNombre, "\nImagenAutor: ", autorImagen)
        
        const card = `
            <div class="article"> 
                <img src="images/pexels-minan1398-1482803.jpg" alt="">
                <div class="article_content">
                    <div class="article_user">
                        <div class="user_profile">
                            <i class="fa-solid fa-user"></i>
                            <div>
                                <p>${autorNombre}<i class="fa-solid fa-crown"></i></p>
                                <p> ${fecha} · ${tiempoLectura}min.</p>
                            </div>
                        </div>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                    <div class="article_text">
                        <h2>${titulo}</h2>
                        <p>${desc}</p>
                    </div>
                    <hr>
                    <div class="article_interactions">
                        <div>
                            <p>${visitas} visualizaciones</p>
                            <p>${numComentario}comentarios</p>
                        </div>
                        <p>${likes}<i class="fa-regular fa-heart"></i></p>
                    </div>
                </div>
            </div> 

        `
        cards = cards + card;
    }

    //Inyectar contenido al div
    const documento = document.querySelector("article")
    documento.innerHTML = cards

})