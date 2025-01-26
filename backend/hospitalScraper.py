from bs4 import BeautifulSoup
from xata.client import XataClient
import re
import json
import requests
from dotenv import load_dotenv
import os
load_dotenv(".env")
db_url_env = os.environ.get("XATA_DATABASE_URL")
api_key_env = os.environ.get("XATA_API_KEY")
# Base URL of the pages to scrape
base_url = "https://www.quebec.ca/en/health/health-system-and-services/service-organization/quebec-health-system-and-its-services/situation-in-emergency-rooms-in-quebec?id=24981&tx_solr%5Blocation%5D=&tx_solr%5Bpt%5D=&tx_solr%5Bsfield%5D=geolocation_location&tx_solr%5Bpage%5D="
xata = XataClient()
hospitals = []

# Loop through all 12 pages
for page in range(1, 13):
    url = base_url + str(page)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    
    for hospital_element in soup.find_all("div", class_="hospital_element"):
        hospital_info = {}
        
        # Hospital name and postal code
        title_element = hospital_element.find("div", class_="font-weight-bold")
        title = title_element.text.strip() if title_element else "N/A"
        
        address_element = hospital_element.find("div", class_="adresse")
        address = address_element.text.strip() if address_element else "N/A"
        postal_code_match = re.search(r'[A-Z]\d[A-Z] ?\d[A-Z]\d', address)
        postal_code = postal_code_match.group() if postal_code_match else "N/A"
        
        # Extracting specific stats
        stats = hospital_element.find_all("li", class_="hopital-item")
        waiting_time = stats[0].find("span", class_="font-weight-bold").text.strip() if len(stats) > 0 and stats[0].find("span") else "N/A"
        people_waiting = stats[1].find("span", class_="font-weight-bold").text.strip() if len(stats) > 1 and stats[1].find("span") else "N/A"
        total_people = stats[2].find("span", class_="font-weight-bold").text.strip() if len(stats) > 2 and stats[2].find("span") else "N/A"
        occupancy_rate = stats[3].find("span", class_="font-weight-bold").text.strip() if len(stats) > 3 and stats[3].find("span") else "N/A"
        avg_wait_room = stats[4].find("span", class_="font-weight-bold").text.strip() if len(stats) > 4 and stats[4].find("span") else "N/A"
        avg_wait_stretcher = stats[5].find("span", class_="font-weight-bold").text.strip() if len(stats) > 5 and stats[5].find("span") else "N/A"
        
        hospital_info = {
            "name": title,
            "postal_code": postal_code,
            "resources":json.dumps({
                "Estimated Waiting Time": waiting_time,
                "People Waiting": people_waiting,
                "Total People in ER": total_people,
                "Occupancy Rate": occupancy_rate,
                "Avg Wait Room": avg_wait_room,
                "Avg Wait Stretcher": avg_wait_stretcher
            })
        }
        print(hospital_info)
        if postal_code:
            if postal_code[0] == "H":
                try: 
                    data = xata.records().insert("hospitals", hospital_info)
                    print(data.is_success)
                    assert data.is_success
                except:
                    print("fuck you")
        

print("Data saved to xata")
