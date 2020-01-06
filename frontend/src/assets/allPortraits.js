function randomPortraitPlayer(){
    const portraitsUrlArray = [
        'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=344&q=80',
        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80',
        'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=311&q=80',
        'https://images.unsplash.com/photo-1544098485-2a2ed6da40ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
    ];

    let i = Math.floor(Math.random()*portraitsUrlArray.length);
    return portraitsUrlArray[i];

}

function randomPortraitMonster(){
    const portraitsUrlArray = [
        'https://i.ytimg.com/vi/ozav7uMWcFM/maxresdefault.jpg',
        'https://fsmedia.imgix.net/b2/2c/51/5e/c185/4d28/858a/d7c161ca53c9/a-gibbering-mouther.jpeg?crop=edges&fit=crop&auto=compress&h=900&w=1200',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLvcI4JOxa6YzIspEWyy0wc6MBZU8DQ4JbkJihi-xQDs_phk3C&s',
        'https://dungeonsolvers.com/wp-content/uploads/2018/11/night_walker_by_benwootten_dcc5j10-pre.jpg',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.8uNVfwTAKbSorR8jaTfHVwAAAA%26pid%3DApi&f=1%27'
    ];

    let i = Math.floor(Math.random()*portraitsUrlArray.length);
    return portraitsUrlArray[i];

}

module.exports = {
    randomPortraitMonster,
    randomPortraitPlayer
}

