import requests
from bs4 import BeautifulSoup


def scrape_website(url, tag, tag_id=None, tag_class=None):
    headers = {'User-Agent': 'Mozilla/5.0'}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Failed to retrieve page: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    if tag_id is None:
        containers = soup.find_all(tag, class_=tag_class)
    else:
        containers = soup.find_all(tag, id=tag_id)

    return containers


def scrape_jobs(keyword, location, experience):
    url = f"https://www.timesjobs.com/candidate/job-search.html?from=submit&luceneResultSize=25&txtKeywords={keyword}&cboWorkExp1={experience}&postWeek=60&searchType=personalizedSearch&actualTxtKeywords={keyword}&searchBy=0&rdoOperator=OR&txtLocation={location}&pDate=I&sequence=1&startPage=1"
    containers = scrape_website(url, "li", tag_class="clearfix job-bx wht-shd-bx")
    jobs = []
    for container in containers:
        title = container.find('h2', class_="heading-trun").text.strip()
        link = container.find('a', class_="posoverlay_srp" )['href']
        posted_time = container.find('span', class_="sim-posted").text.strip()
        company = container.find('h3', class_="joblist-comp-name").text.strip()
        c1 = container.find_all('li')
        more_skills = [cont.text.strip() for cont in container.find_all('span')[3:]]
        location = c1[2].text.strip()
        experience = c1[3].text.strip()
        salary = c1[4].text.strip()
        description = container.find('li', class_="job-description__").text.strip()

        jobs.append({'title': title, 'link': link, 'posted_time': posted_time, 'company': company, 'more_skills': more_skills,
                     'location': location, 'experience': experience, 'salary': salary, 'description': description})

    return jobs


def scrape_news(keyword):
    url = f"https://www.timesjobs.com/candidate/job-search.html?from=submit&luceneResultSize=25&txtKeywords={keyword}&cboWorkExp1=&postWeek=60&searchType=personalizedSearch&actualTxtKeywords={keyword}&searchBy=0&rdoOperator=OR&txtLocation=&pDate=I&sequence=1&startPage=1"
    containers = scrape_website(url, "li", tag_class="clearfix job-bx wht-shd-bx")
    news = []
    for container in containers:
        title = container.find('h2', class_="heading-trun").text.strip()
        link = container.find('a', class_="posoverlay_srp" )['href']
        posted_time = container.find('span', class_="sim-posted").text.strip()
        company = container.find('h3', class_="joblist-comp-name").text.strip()
        c1 = container.find_all('li')
        more_skills = [cont.text.strip() for cont in container.find_all('span')[3:]]
        location = c1[2].text.strip()
        experience = c1[3].text.strip()
        salary = c1[4].text.strip()
        description = container.find('li', class_="job-description__").text.strip()

        news.append({'title': title, 'link': link, 'posted_time': posted_time, 'company': company, 'more_skills': more_skills,
                     'location': location, 'experience': experience, 'salary': salary, 'description': description})

    return news
