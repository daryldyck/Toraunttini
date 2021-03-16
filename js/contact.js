// Web Development Fundamentals - MADS4007
// Toraunttini Restuarant & Martini Bar

// Group 7
// Brian Domingo - 101330689
// Daryl Dyck - 101338429 

function initMap()
{
  // The location of Uluru
  const uluru = {
    lat: 43.649996,
    lng: -79.385849
  };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: uluru
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({ position: uluru, map: map });
}

