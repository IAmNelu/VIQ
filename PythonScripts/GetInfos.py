import csv
import json


def list_keys(jsonObj):
    keys = jsonObj.keys()
    keys_list = []
    for k in keys:
        keys_list.append(k)

    return keys_list


def get_circoscrizione(street_name, street_no, csv_path):
    with open(csv_path) as fileCAP:
        csv_reader = csv.reader(fileCAP, delimiter=';')
        line_count = 0
        headers = []
        single_line_data = {}
        cap = 'NOT FOUND'
        for row in csv_reader:
            if line_count == 0:
                for element in row:
                    headers.append(element)
                line_count += 1
            else:
                for header, value in zip(headers, row):
                    if header == 'VIA' or header == 'CIVICO' or header == 'CAP':
                        single_line_data[header] = value

                if single_line_data['VIA'].lower() == street_name.lower():
                    cap = single_line_data['CAP']
                    if single_line_data['CIVICO'].lower().split('/')[0] == street_no.lower().split('/')[0]:
                        return single_line_data['CAP']

        if cap == 'NOT FOUND':
            print('NOT FOUND : ' + street_name+ ' - ' + str(street_no))
        return cap


pathFileVRC = './VRC2017.csv'
pathCircoscrizioni = './NumeroCivico_CAP_WGS84_.csv'


with open(pathFileVRC) as fileVRC:
    csv_reader = csv.reader(fileVRC, delimiter=';')
    done = []
    line_count = 0
    headers = []
    notF_c = 0
    single_line_data = {}
    len = 5309
    count_done = 0
    for row in csv_reader:
        if line_count == 0:
            for element in row:
                headers.append(element)
            line_count += 1
        else:
            for header, value in zip(headers, row):
                single_line_data[header] = value
            circoscrizione = get_circoscrizione(single_line_data['Via 1'], single_line_data['Numero Civico'], pathCircoscrizioni)
            if circoscrizione == 'NOT FOUND':
                notF_c += 1
                print(str(notF_c) + '-' + str(count_done))
            done.append(circoscrizione)
            perc = count_done * 100 / 5309
            if count_done % 10 == 0:
                print(count_done)
            line_count += 1
            count_done += 1
    print(done)

print('Fine')





