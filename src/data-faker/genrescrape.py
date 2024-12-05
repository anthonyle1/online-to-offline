from selenium import webdriver
from bs4 import BeautifulSoup

#ik global variables r ugly but pls spare me
games = {}
game_id = {}

def exportData(): # creates a CSV file
    file = open("games.csv", "w")
    for key, value in games.items():
        file.write(f"{game_id[key]}, <{key}>")
        for genre in value:
            file.write(f", {genre}")
        file.write('\n')

def findGamesperGenre(key, id):
    url = f"https://store.steampowered.com/search/?tags={id}&category1=998&supportedlang=english&filter=topsellers&ndl=1"
    driver = webdriver.Chrome()
    driver.get(url)
    source = driver.page_source
    data_name = "data-ds-appid="
    webhtml = BeautifulSoup(source, 'html.parser')
    ids = webhtml.find_all("div", {'class': "page_content_ctn"})
    webhtml = webhtml.find_all("span", {'class': 'title'})
    l = []
    ids = str(ids)
    a = ids.find(data_name)

    for c in webhtml:
        l.append(str(c))
    for n in l:
        a = ids.find(data_name)
        n = n[:n.find("</span>")]
        n = n[n.find(">") + 1:]
        game_id[n] = ids[(a + len(data_name) + 1) : ids.find('"', (a + len(data_name) + 1))]
        print(n, game_id[n])
        ids = ids[ids.find('"', (a + len(data_name) + 1)):]
        if n not in games:
            games[n] = []
        games[n].append(key)

def findTopGameGenres():

    url = "https://store.steampowered.com/search/?category1=998&supportedlang=english&filter=topsellers&ndl=1"
    driver = webdriver.Chrome()
    driver.get(url)
    source = driver.page_source
    webhtml = BeautifulSoup(source, 'html.parser')
    webhtml = webhtml.find_all("div", {'data-param': 'tags'})

    dl = 'data-loc="'
    dv = 'data-value="'

    genre_url = {}

    l = []
    for c in webhtml:
        l.append(str(c))
    for n in l:
        n = n[:n.find("<span")]
        id = n[n.find(dv) + len(dv):]
        id = id[:id.find('"')]
        name = n[n.find('data-loc="') + len(dl):]
        name = name[:name.find('"')]
        print(name);

    #for key, value in genre_url.items():
    #    findGamesperGenre(key, value)


findTopGameGenres()
