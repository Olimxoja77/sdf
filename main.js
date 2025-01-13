

// Tugmani bosish eventi
document.getElementById("submitBtn").addEventListener("click", function() {
    const name = document.getElementById("nameInput").value.trim();

    if (name === "") {
        document.getElementById("result").innerText = "Iltimos, ismni kiriting.";
        return;
    }

    // APIga so'rov yuborish
    fetch(`https://api.nationalize.io/?name=${name}`)
        .then(response => response.json())
        .then(data => {
            // Agar natijalar bo'lsa, eng yuqori ehtimolga ega millatni ko'rsatish
            if (data.country.length > 0) {
                let resultText = `${name} ismi eng ko'p ishlatiladigan millatlar:`;
                data.country.forEach(country => {
                    resultText += ` ${country.country_id} (ehtimollik: ${Math.round(country.probability * 100)}%)`;
                });
                document.getElementById("result").innerText = resultText;
            } else {
                document.getElementById("result").innerText = "Bu ism bo'yicha ma'lumot topilmadi.";
            }
        })
        .catch(error => {
            document.getElementById("result").innerText = "Xatolik yuz berdi.";
        });
});
