'''
Este é um exemplo, apenas um exemplo, de como imagino o programa funcionando.
Abstraia de certas coisas que não domino
'''
#aqui estamos fazendo uma entrada da expressão lógica. No js vocês vão usar os botões para fazer este input
txtLogc = input('Digite uma expressão lógica: ')

'''estou criando uma lista para fazer o fatiamento de string, pois não sei fazer botões e associá-los a valores
você farão isso com os botões.'''

expLogc = [0]*len(txtLogc)

#aqui começa o fatiamento da txtLogc, vamos atribuir a lista expLogc para criar a expressão separadamente
for i in range(expLogc):
    expLogc[i] = txtLogc[i]

print(expLogc)
