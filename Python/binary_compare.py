def binary_compare(data, col, target, true=True, false=False, reverse=False):
    feature_stats = dict()
    percentages = dict()
    attributes = data[col].unique()
    targets = data[target].unique()

    for index, row in df.iterrows():
        if row[col] in feature_stats.keys():
            if row[target] == true:
                feature_stats[row[col]]['true'] += 1
            else:
                feature_stats[row[col]]['false'] += 1
        else:
            feature_stats[row[col]] = {
                'true': 0,
                'false': 0
            }

    #Percetage
    for key in feature_stats.keys():
        total = feature_stats[key]['true'] + feature_stats[key]['false']
        if total != 0:
            per = feature_stats[key]['true']/total if not reverse else feature_stats[key]['false']/total
        else:
            per = 0
        
        feature_stats[key]['percentage'] = per
        percentages[key] = per
    
    #Plotting    
    x = percentages.keys()
    y = percentages.values()
    
    plt.bar(x, y)
    plt.show()
    
    return percentages