const items = [
    {
        name: "MSI B450M PRO AM4 Motherboard",
        price: 60,
        image: "https://cdna.pcpartpicker.com/static/forever/images/product/9f282b8b21d7c5b1fae9b0474ed77164.256p.jpg",
        link: "https://www.amazon.co.uk/MSI-B450M-PRO-VDH-MAX-Motherboard/dp/B07WC724Z7/"
    },
    {
        name: "AMD Ryzen 5 5600X CPU",
        price: 110,
        image: "https://cdna.pcpartpicker.com/static/forever/images/product/3ef757133d38ac40afe75da691ba7d60.256p.jpg",
        link: "https://www.amazon.co.uk/AMD-Ryzen-5600X-Processor-Cache/dp/B08166SLDF"
    },
    {
        name: "Crucial P3 500GB M.2 SSD",
        price: 35,
        image: "https://cdna.pcpartpicker.com/static/forever/images/product/5b0cd518feacc76794f17f75745b2907.256p.jpg",
        link: "https://www.amazon.co.uk/Crucial-500GB-PCIe-Gen3-Internal/dp/B0B25LQQPC"
    },
    {
        name: "NZXT H5 Flow Case (White)",
        price: 60,
        image: "https://cdna.pcpartpicker.com/static/forever/images/product/6c58fbf47cba2aca9c9a56ff028fe5d9.256p.jpg",
        link: "https://www.amazon.co.uk/NZXT-H5-Flow-CC-H51FB-01-Quick-Release/dp/B0B7VMKP4Y"
    },
    {
        name: "KOORUI 27\" 4K 144Hz Monitor",
        price: 150,
        image: "https://m.media-amazon.com/images/I/419050aOmfL.jpg",
        link: "https://www.amazon.co.uk/KOORUI-FreeSync-Mountable-2560x1440-DisplayPort/dp/B0BBMPF6PT"
    }
];

// populate items
window.onload = () => {
    const markerTemplate = document.querySelector("#marker");
    if (markerTemplate == null) {
        console.error("marker template not found");
        return;
    }

    let total = 0; 
    items.forEach((i) => {
        total += i.price;
    });

    document.querySelector("#total-cost").textContent = "£" + total;

    let cumCost = 0;
    items.forEach((i) => {
        cumCost += i.price;
        const marker = markerTemplate.content.cloneNode(true);
        marker.querySelector(".marker").setAttribute("style", "left: " + (cumCost / total * 100) + "%");
        marker.querySelector(".marker-name").textContent = i.name;
        marker.querySelector(".marker-price").textContent = "£" + i.price;
        marker.querySelector(".marker-img").setAttribute("src", i.image);
        marker.querySelector(".marker-buy").setAttribute("href", i.link);
        document.querySelector(".progress-box").appendChild(marker);
    });
};