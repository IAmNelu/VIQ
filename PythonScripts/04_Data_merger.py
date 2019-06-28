import csv
import json
import time

# funzione che ricava le chiavi e le salva in una lista, la funzione non è usata ma è stata lasciata per scopi di debug
def list_keys(jsonObj):
    keys = jsonObj.keys()
    keys_list = []
    for k in keys:
        keys_list.append(k)

    return keys_list

def is_in(lista_strade, numero):
    for strada in lista_strade:
        min_no = strada['CIVICO MIN']
        max_no = strada['CIVICO MAX']
        if min_no  <= numero <= max_no:
            return strada['CAP'] #se il civico è compreso viene ritornato
    return lista_strade[0]['CAP'] #altrimenti viene ritornato il primo civico della lista


def get_CAP(street_name, street_no, json_ncc):
    
    istanze_trovate = []
    headers = []
    for ncc_value in json_ncc: #row: VIA;CIVICO MIN;CIVICO MAX;CAP
        if ncc_value['VIA'].lower() == street_name.lower(): #se i nomi delle vie corrispondono le singole istanze vengono aggiunte ad un array
            istanze_trovate.append(ncc_value)
    if len(istanze_trovate) == 0:
        # se non è stata trovata nessuna via ritorna NOT FOUND
        return 'NOT FOUND'
    elif len(istanze_trovate) == 1: #se  è stata trovata solo una via viene ritornato il cap corrispondente
        return istanze_trovate[0]['CAP']
    return is_in(istanze_trovate, street_no) #controlla tra le istanze trovate una di esse contiene il civico desiderato


pathFileVRC = './03_f_VRC_min.json'
pathNCC = './03_f_NCC_min_max.json'
pathDest = './04_f_data_final.json'
no_specific_number = 0

with open(pathFileVRC) as fileVRC, open(pathNCC) as fileNCC, open(pathDest, 'w') as fileDestJson:
    start_time = time.time()
    json_ncc = json.load(fileNCC)
    json_data = json.load(fileVRC)
    # apre i file json
    json_result = []
    not_caped = 0
    processed = 0
    for signle_object in json_data:
        if signle_object['Via 1'] == '(Altri)':
            signle_object['CAP'] = '' # se non è presente una via lascia il campo CAP in bianco
        else:
            # funzione che restituisce il cap ricevendo in ingresso la via, il civico e il json con le vie e i cap 
            signle_object['CAP'] = get_CAP(signle_object['Via 1'], signle_object['Numero Civico'], json_ncc)
        if signle_object['CAP'] == 'NOT FOUND':
            if not_caped < 30:
                print(signle_object['Via 1']+ ' - '+ signle_object['Numero Civico'])
            not_caped += 1
        processed += 1
    percentage = 100 * not_caped / processed
    print("Out of " + str(processed) + " sanctions " + str(not_caped) + " were not found\t" + str(percentage) +"%" )
    chiavi = json_data[0].keys()
    json.dump(json_data, fileDestJson)
    print("--- %.5s seconds ---" % (time.time() - start_time))
print('Fine')





