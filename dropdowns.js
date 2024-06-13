function toggle_dropdown(element) {
    const dropdown_dropped = new CustomEvent('dropdownDropped', {});
    document.dispatchEvent(dropdown_dropped);
    //console.log("Toggling dropdown for:", element);
    element.classList.toggle("active");
    var content = element.nextElementSibling;

    if (content.style.maxHeight) {
        element.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/60/60781.png";
        content.style.maxHeight = null;
    } else {
        element.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/566/566094.png')";
        content.style.display = "block";
        content.style.maxHeight = content.scrollHeight + "px";
        
        // Recalculate the height for all parent elements
        var parentContent = content.parentNode;
        while (parentContent.classList.contains("content")) {
            parentContent.style.display = "block";
            parentContent.style.maxHeight = parseInt(parentContent.style.maxHeight) + parseInt(content.scrollHeight) + "px";
            parentContent = parentContent.parentNode;
        }
    }
}

//create dropdowns from divs
var dropdowns = document.getElementsByTagName("dropset");

for (let i = 0; i < dropdowns.length;) {
    var dropdown = dropdowns[i];

    var dropdown_button = document.createElement('button');
    dropdown_button.classList.add('dropdown-button');

    var dropdown_title = document.createElement('span');
    dropdown_title.classList.add('dropdown-text');
    dropdown_title.innerHTML = dropdown.getAttribute('title');;
    dropdown_button.appendChild(dropdown_title);

    var dropdown_content = document.createElement('div');
    dropdown_content.classList.add('content');

    dropdown_content.innerHTML = dropdown.innerHTML;
    dropdown.insertAdjacentElement('afterend', dropdown_content);
    dropdown.insertAdjacentElement('afterend', dropdown_button);

    if (dropdown.classList.contains('active')) {
        dropdown_button.classList.add('active');
    }

    dropdown.remove();

    dropdown_button.addEventListener("click", function() {
        toggle_dropdown(this)
    });
};

//open all dropdowns toggled by default
document.addEventListener("DOMContentLoaded", function() {
    window.onload = function() {
        let actives = Array.from(document.getElementsByClassName("active"));
        for (let i = 0; i < actives.length; i++) {
            actives[i].classList.toggle("active");
            toggle_dropdown(actives[i])
        }
    }
});