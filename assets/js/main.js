(function () {
    const idx = lunr.Index.load(sassdocIndex);
    const searchBox = document.getElementById('search-results');
    const searchInput = document.getElementById("search");

    const renderListItem = items => {
        return items.map(item => {
            const arr = item.ref.split('-');
            const type = arr[0];
            const name = arr.slice(1).join('-');

            return `
            <li>
                <a href=#${item.ref}>
                    <span>${type}</span>
                    <span>${name}</span>
                </a>
            </li>
        `;
        }).join('');
    };

    const listTemplate = items => {
        return `
            <ul>
                ${renderListItem(items)}
            </ul>
        `;
    };


    init = () => {
        hljs.initHighlightingOnLoad();
        searchInput.addEventListener('input', this.search);
    }

    search = (e) => {
        const term = e.target.value;
        let result = '';
        if (term) {
            result = idx.search(`${term}~1`)
        } else {
            this.renderSearchItems(searchBox, () => '', null);
            return;
        }

        this.renderSearchItems(searchBox, listTemplate, result);
    }

    renderSearchItems = (target, template, data) => {
        try {
            target.innerHTML = template(data);
        } catch (err) {
            throw err;
        }
    }

    this.init();
})();