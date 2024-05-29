document.addEventListener('DOMContentLoaded', function() {
    const userContainer = document.getElementById('user-container');
    const fetchButton = document.getElementById('fetchButton');

    const Person = {
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        phone: '',
        photo: ''
    };

    const bigLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Fetch user data from Random User API
    const fetchUserData = () => {
        fetch("https://randomuser.me/api/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updatePersonData(data.results[0]);
            displayUserData();
            changeClothing();
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    };

    // Update Person object with fetched data
    const updatePersonData = (user) => {
        Person.firstName = user.name.first;
        Person.lastName = user.name.last;
        Person.gender = bigLetter(user.gender);
        Person.email = user.email;
        Person.phone = user.phone;
        Person.photo = user.picture.large;
    };

    // Display user data in the DOM
    const displayUserData = () => {
        userContainer.innerHTML = '';
        const userElement = document.createElement('div');
        userElement.className = 'user-item';
        userElement.innerHTML = `
            <img src="${Person.photo}" alt="${Person.firstName} ${Person.lastName}">
            <h2 id="person-name">${Person.firstName} ${Person.lastName}</h2>
            <p id="person-gender"><strong>Gender:</strong> ${Person.gender}</p>
            <p id="person-email"><strong>Email:</strong> ${Person.email}</p>
            <p id="person-phone"><strong>Phone:</strong> ${Person.phone}</p>
        `;
        userContainer.appendChild(userElement);
    };

    // Event listener for button click to fetch user data
    fetchButton.addEventListener('click', fetchUserData);
});
