function tester() {
    const url = "/view_api"

    d3.json(url).then(function(response) {
        console.log(response);
    })
};

tester()