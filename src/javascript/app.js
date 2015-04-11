var app = require('./newsContainer.js')


React.render(
    <NewsStand url='http://localhost:3000/sources' />,
    document.getElementById('content')
)
