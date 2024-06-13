//crop images that hecking need it, squirt
var crops = Array.from(document.getElementsByTagName("crop"));
crops.forEach(function(crop) {
    var right = parseFloat(crop.getAttribute('right')) / 100;
    var left = parseFloat(crop.getAttribute('left'));
    var top = parseFloat(crop.getAttribute('top'));
    var bottom = parseFloat(crop.getAttribute('bottom'));

    if (!right) {
        right = 0;
    } 
    if (top) {
        var move_y_by = -top;
    } else {
        var move_y_by = 0;
    }
    if (left) {
        var move_x_by = right-left;
    } else {
        var move_x_by = 0;
    }

    if (left/100 < right) { //resize depending on which side is being cropped more...
        var resize_to = 100 / (1-right);
    } else {
        var resize_to = 100 / (1-(left-right)/100);
    }
    
    if (bottom) { //calculate new height with or without set bottom
        var new_height_percent = 1 - (-move_y_by+bottom)/100;
    } else {
        var new_height_percent = 1  -(-move_y_by)/100;
    }

    var cropped_div = document.createElement('div');
    cropped_div.style.width = resize_to + "%";
    cropped_div.style.transform = "translateY(" + String(move_y_by) + "%) translateX(" + String(move_x_by) + "%)";

    const children = Array.from(crop.childNodes); //move all elements of crop into new cropper thing
    children.forEach(child => {
        cropped_div.appendChild(child);
    });

    var crop_container = document.createElement('div');
    crop_container.className = "crop";

    crop_container.appendChild(cropped_div);
    crop.appendChild(crop_container);

    function updateContainerHeight() {
        var contentHeight = new_height_percent * crop_container.scrollHeight;
        //console.log(crop.scrollHeight)
        crop_container.style.height = contentHeight + 'px';
    }

    window.addEventListener('resize', function() {
        updateContainerHeight();
    });
    document.addEventListener('dropdownDropped', function() {
        updateContainerHeight();
    });

    updateContainerHeight();
})