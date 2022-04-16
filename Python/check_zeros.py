def check_zeros(df):
    columns = df.columns.values
    data = df.values
    
    zero_counts = dict()
    for col in columns:
        zero_counts[col] = 0

    for row in data:
        for index in range(len(row)):
            if row[index] == 0:
                zero_counts[columns[index]] += 1

    return zero_counts