const docId = 'wgjbm8XiPS';
const tableIdOrName = 'grid-zuqYCUgE0p';
const token = '73ca7c73-31f9-4768-adda-acb82cd303ab';
const url = `https://coda.io/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows`;
const pageId = 'c-rSmKJiv4J7';
const descriptionId = 'c-3RnRXsQfAy';
const linkId = 'c-Q2mbOQsII6';
const typeId = 'c-4yGdFqTuW3';

const getData = () => {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            box.innerHTML = '';
            return createBox(data.items);
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
}

const createBox = (boxes) => {
    const box = document.querySelector('#box');
    for (let i = 0; i < boxes.length; i++) {
        const page = boxes[i].values[`${pageId}`];
        const desc = boxes[i].values[`${descriptionId}`];
        const link = boxes[i].values[`${linkId}`];
        const type = boxes[i].values[`${typeId}`];

        let div = document.createElement('div');
        div.classList.add('refrens', 'gap-2', 'mb-2', 'd-flex', 'py-4', 'px-5', 'align-items-center');

        let pageDiv = document.createElement('div');
        pageDiv.classList.add('col-sm-11', 'col-9', 'd-sm-flex', 'gap-5');

        let h5 = document.createElement('h5');
        h5.classList.add('fw-600', 'mb-0');
        h5.innerHTML = page;
        pageDiv.appendChild(h5);

        if (link == "") {
            let p = document.createElement('p');
            p.classList.add('mb-0');
            p.innerHTML = desc;
            pageDiv.appendChild(p);
        } else {
            let a = document.createElement('a');
            a.classList.add('mb-0', 'link');
            a.setAttribute('href', `https://${link}`);
            a.innerHTML = desc;
            pageDiv.appendChild(a);
        }

        let typeDiv = document.createElement('div');
        typeDiv.classList.add('col-sm-1', 'col-3', 'text-center');
        let span = document.createElement('span');
        if (type == 'book') {
            span.classList.add('badge', 'bg-danger', 'd-block');
            span.innerHTML = 'کتاب';
        }
        if (type == 'web') {
            span.classList.add('badge', 'bg-info', 'd-block');
            span.innerHTML = 'سایت';
        }
        if (type == 'article') {
            span.classList.add('badge', 'bg-warning', 'd-block');
            span.innerHTML = 'مقاله';
        }

        typeDiv.appendChild(span);
        div.appendChild(pageDiv);
        div.appendChild(typeDiv);
        box.appendChild(div);
    }
}

getData();