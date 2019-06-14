import csv
import json


def list_keys(jsonObj):
    keys = jsonObj.keys()
    keys_list = []
    for k in keys:
        keys_list.append(k)

    return keys_list


def get_CAP(street_name, street_no, json_ncc):
    
    istanze_trovate = []
    headers = []
    for ncc_value in json_ncc: #row: VIA;CIVICO MIN;CIVICO MAX;CAP
        single_line_obj = {}
        if ncc_value['VIA'].lower()  == street_name.lower():
            istanze_trovate.append(single_line_obj)
    if len(istanze_trovate) == 0:
        return 'NOT FOUND'
    
    return 'SOMETHING'


pathFileVRC = './03_f_VRC_min.json'
pathNCC = './03_f_NCC_min_max.json'
pathDest = './04_f_data_final.json'

with open(pathFileVRC) as fileVRC, open(pathNCC) as fileNCC, open(pathDest, 'w') as fileDestJson:
    json_ncc = json.load(fileNCC)
    json_data = json.load(fileVRC)
    json_result = []
    not_caped = 0
    processed = 0
    for signle_object in json_data:
        signle_object['CAP'] = get_CAP(signle_object['Via 1'], signle_object['Numero Civico'], json_ncc)
        if signle_object['CAP'] == 'NOT FOUND':
            #print(signle_object)
            not_caped += 1
        processed += 1

    percentage = 100 * not_caped / processed
    print("Out of " + str(processed) + " sanctions " + str(not_caped) + " were not found\t" + str(percentage) +"%" )
    chiavi = json_data[0].keys()
    json.dump(json_data, fileDestJson)
print('Fine')





