

button.onclick = async function sendComment(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const mail = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    var formData = [name, mail, message];
    
    try {
        
        const response = await fetch('https://nightfox.no/JapanTravelBlog/wp-json/wp/v2/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(formData),
        });

if (response.ok) {
    console.log('Comment submitted successfully!');
} else {
    console.error('Error submitting comment.');
}
} catch (error) {
console.error('Error:', error);
}}