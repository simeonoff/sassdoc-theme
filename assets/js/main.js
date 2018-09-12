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
            <li class="search-form__results-list-item">
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
            <ul class="search-form__results-list">
                ${renderListItem(items)}
            </ul>
        `;
    };


    init = () => {
        hljs.initHighlightingOnLoad();
        searchInput.addEventListener('input', this.search);
        this.toggle('.nav-group__header', 'click');
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
        if (data) {
            target.innerHTML = template(data);
            this.showSearchResults();
        } else {
            this.hideSearchResults();
        }
    }

    showSearchResults = () => {
        searchBox.classList.remove('search-form__results--hidden');
    }

    hideSearchResults = () => {
        searchBox.classList.add('search-form__results--hidden');
    }

    toggle = (el, trigger) => {
        document.querySelectorAll(el).forEach(item => {
            const group = item.dataset.toggles;
            item.addEventListener(trigger, () => this.onToggleHandler(group, item));
        });
    }

    onToggleHandler = (group, parent) => {
        const subnav = document.querySelectorAll(`.${group}`);

        parent.classList.toggle(`${parent.classList[0]}--collapsed`);
        subnav.forEach(nav => {
            nav.classList.toggle(`${nav.classList[0]}--collapsed`);
        });
    }

    this.init();
})();