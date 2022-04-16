def binary_stat(data, col, target):
    feature_stats = dict()
    attributes = data[col].unique()
    targets = data[target].unique()

    for index, row in df.iterrows():
        if row[col] in feature_stats.keys():
            feature_stats[row[col]][row[target]] += 1
        else:
            newDict = dict()
            for i in targets:
                newDict[i] = 0
            feature_stats[row[col]] = newDict
    # Plotting
    plot_cols = 3
    plot_rows = math.ceil(len(attributes)/plot_cols)

    fig = plt.figure(figsize=(15,4))
    fig.tight_layout(pad=10.0)
    for i in range(len(attributes)):
        keys = list(feature_stats[attributes[i]].keys())
        values = list(feature_stats[attributes[i]].values())
        ax = fig.add_subplot(plot_rows,plot_cols,i+1)
        ax.bar(keys, values)
        ax.set_title("{target} in {name} if {val}".format(target=target, name=col, val=attributes[i]))

    # set the spacing between subplots
    plt.subplots_adjust(wspace=0.4, hspace=0.4)
        
    return feature_stats