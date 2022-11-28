//Developer by Paul
Element.prototype.dropZone = function(configuration) {
    let dropZoneElement = this, 
        input = document.createElement('input'),
        div = document.createElement('div'),
        p = document.createElement('p'),
        buttonNext = document.createElement('button'),
        buttonBack = document.createElement('button'),
        currentFileIndex, targetInput;

        buttonBack.type = 'button';
        buttonNext.type = 'button';

        applyConfiguration(configuration);
    
    buttonNext.innerText = '>';
    buttonBack.innerText = '<';
    buttonNext.classList.add('drop-zone-button');
    buttonBack.classList.add('drop-zone-button');

    input.type = 'file';
    div.appendChild(p);

    dropZoneElement.appendChild(div);

    input.addEventListener('change', setFiles);
    dropZoneElement.addEventListener('drop', setFiles);

    buttonNext.addEventListener('click', e => {
        e.stopPropagation();
        currentFileIndex = currentFileIndex < input.files.length - 1 ? currentFileIndex + 1 : currentFileIndex;
        renderThumbnail(currentFileIndex);
    });

    buttonBack.addEventListener('click', e => {
        e.stopPropagation();
        currentFileIndex = currentFileIndex - 1 >= 0 ? currentFileIndex - 1 : 0;
        renderThumbnail(currentFileIndex);
    });
    
    dropZoneElement.addEventListener('click', e => {
        e.preventDefault();
        input.click();
    });
    
    dropZoneElement.addEventListener('dragover', e => {
        e.preventDefault();
        dropZoneElement.classList.add('drop-zone-over');
    });
    
    dropZoneElement.addEventListener('dragend', e => {
        e.preventDefault();
        dropZoneElement.classList.remove('drop-zone-over');
    });
    
    dropZoneElement.addEventListener('dragleave', e => {
        e.preventDefault();
        dropZoneElement.classList.remove('drop-zone-over');
    });
    
    //Files functions
    function setFiles(e) {
        e.preventDefault();
        currentFileIndex = 0;
        let files = e.type === 'drop' ? e.dataTransfer.files : e.target.files;
        if (files.length > 0) {
            input.files = files;
            setFileToTarget(files);
            updateThumbnail();
        }
    }

    function updateThumbnail() {
        if(!Array.from(div.classList).includes('drop-zone-thumb-container')) {
            p.remove();
            div.classList.add('drop-zone-thumb-container');

            let containerThumbInfo = document.createElement('div');
            containerThumbInfo.classList.add('drop-zone-thumb');

            let spanThumbnail = document.createElement('span');
            spanThumbnail.classList.add('drop-zone-thumb-data');

            containerThumbInfo.appendChild(spanThumbnail);
            div.appendChild(containerThumbInfo);
        }

        if(input.files.length > 1) {
            let containerThumb = dropZoneElement.querySelector('.drop-zone-thumb-container');
            containerThumb.insertBefore(buttonBack, containerThumb.querySelector('.drop-zone-thumb'));
            containerThumb.insertBefore(buttonNext, null);
            div.querySelector('.drop-zone-thumb').style.width = '80%';
        }
        else {
            buttonBack.remove();
            buttonNext.remove();
            div.querySelector('.drop-zone-thumb').style.width = '100%';
        }

        renderThumbnail(currentFileIndex);
    }

    function setFileToTarget(files) {
        if(targetInput) targetInput.files = files;
    }

    function renderThumbnail(index) {
        let thumbInfo = div.querySelector('.drop-zone-thumb-data'),
            image = div.querySelector('.drop-zone-thumb'),
            files = input.files;
        
        thumbInfo.innerHTML = files[index].name;
        
        if(files[index].type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(files[index]);
            reader.onload = () => {
                image.style.backgroundImage = `url('${reader.result}')`;
            }
        }
        else
            image.style.backgroundImage = null;
    }

    //Configuration
    function applyConfiguration(config) {
        setDropZone();
        if(config) {
            setDropZonePlaceholder(config);
            setMultipleFile(config);
            setTargetInput(config);
        }
    }

    function setDropZone() {
        if (!Array.from(dropZoneElement.classList).includes('drop-zone'))
            dropZoneElement.classList.add('drop-zone');
    }

    function setDropZonePlaceholder(config) {
        if(config.placeholder)
            p.innerHTML = config.placeholder;
        else
            p.innerHTML = 'Drop file here or click to upload';
    }

    function setMultipleFile(config) {
        input.setAttribute('multiple', config.multiple);
    }

    function setTargetInput(config) {
        if (config.targetInput) {
            let target = config.targetInput === 'string' ? document.querySelector(config.targetInput) : config.targetInput;
            targetInput = verifyTargetInput(target);
        }
    }

    function verifyTargetInput(target) {
        if (target.tagName.toLowerCase() === 'input') {
            target.type = 'file';
            target.style.display = 'none'; 
            return target;
        }
        else
            console.error('Invalid input');
        return undefined;
    }

    return {
        getFiles : () => input.files
    };
}