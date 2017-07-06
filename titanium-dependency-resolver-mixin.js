var TitanumDependencyResolverMixin = (superClass) => {
    return class extends superClass {
        ready() {
            if (super.ready)
                super.ready();
            this.providers = {};
            this.unprovidedRequests = {};
            window.addEventListener("titanium-provide-instance", (event) => {
                const key = event.detail.key;
                const instance = event.detail.instance;
                this.providers[key] = instance;
                if (this.unprovidedRequests[key]) {
                    this.unprovidedRequests[key].forEach((resolve) => {
                        resolve(instance);
                    });
                }
            });
            window.addEventListener("titanium-request-instance", (event) => {
                var key = event.detail.key;
                var resolve = event.detail.resolve;
                var instance = this.providers[key];
                console.log(key, instance);
                if (instance) {
                    console.log(resolve);
                    resolve(instance);
                }
                else {
                    if (this.unprovidedRequests[key]) {
                        this.unprovidedRequests[key].push(resolve);
                    }
                    else {
                        this.unprovidedRequests[key] = [resolve];
                    }
                }
            });
        }
    };
};