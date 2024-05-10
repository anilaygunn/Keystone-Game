def main():
    devam = "e"
    while devam.upper() == "E":
        tas_hareket_ve_konumu()

        devam = input("Devam etmek istiyor musunuz ?")


def oyuncu_karakteri_secme():
    oyuncu1 = input("Lütfen karakter giriniz:")
    oyuncu2 = input("Lütfen karakter giriniz:")

    return oyuncu1, oyuncu2


def oyun_tahtasini_yazdir(boyut, harfler, oyun_alani, oyuncu1, oyuncu2):
    print(" ", end=" ")  # SİLME LAN BUNU
    for i in harfler:
        print(f"  {i}", end=" ")
    print("   ")
    print("  ", "-", "----" * boyut, sep="")

    for j in range(1, boyut + 1):
        print(f"{j} |", end="")
        for key in oyun_alani.keys():
            if oyun_alani[key][j - 1] == "Oyuncu1":
                tas_karakteri = oyuncu1
            elif oyun_alani[key][j - 1] == "Oyuncu2":
                tas_karakteri = oyuncu2
            else:
                tas_karakteri = " "

            print(f" {tas_karakteri} |", end="")
        print(f" {j}")
        print("  ", "-", "----" * boyut, sep="")


def tas_konumu_al(boyut, harfler):
    devam = True
    while devam:
        konumlar = input()
        simdiki = konumlar[:2]
        sonraki = konumlar[3:]
        a, b = simdiki[0], simdiki[1]
        val, key = int(b), a

        c, d = sonraki[0], sonraki[1]
        valS, keyS = int(d), c
        if (val < 1 or val > boyut) or (valS < 1 or valS > boyut):
            print("Lütfen geçerli bir satır değeri giriniz:", end="")
            continue
        elif (key not in harfler) or (keyS not in harfler):
            print("Lütfen geçerli bir sütun değeri giriniz:", end="")
            continue

        devam = False

    return val, key, valS, keyS


def tas_hareket_ve_konumu():
    boyut = int(input("Boyut:"))
    alfabe = "ABCDEFGH"
    harfler = []
    oyun_alani = {}
    oyuncu1, oyuncu2 = oyuncu_karakteri_secme()

    for i in range(boyut):
        eleman = alfabe[i]
        oyun_alani.get(eleman)
        harfler.append(eleman)

    for j in harfler:
        oyun_alani[j] = [False] * boyut

    for val in oyun_alani.values():

        for a in range(boyut):

            if a == 0:
                val[a] = "Oyuncu1"
            elif a == (boyut - 1):
                val[a] = "Oyuncu2"
    oyun_tahtasini_yazdir(boyut, harfler, oyun_alani, oyuncu1, oyuncu2)

    oyun_bitti = False

    while not oyun_bitti:

        oyuncu_sirasi = oyuncu1
        yeni_konum = "Oyuncu1"

        while not oyun_bitti:
            print(
                f"Oyuncu {oyuncu_sirasi}, lütfen hareket ettirmek istediğiniz kendi taşınızın konumunu ve hedef konumu giriniz:",
                end="")
            val, key, valS, keyS = tas_konumu_al(boyut, harfler)

            if oyuncu_sirasi == oyuncu1:
                while oyun_alani[key][val - 1] != "Oyuncu1":  # Oyuncu1 kendi taşını seçmediyse
                    if oyun_alani[key][val - 1] == "Oyuncu2":
                        if oyun_alani[keyS][valS - 1] != False:
                            print("Rakibinizin taşını oynatamazsınız ve lütfen boş bir kareye hareket ediniz.",end="")
                        else:
                            print("Rakibinizin taşını oynatamazsınız. Lütfen kendi taşınızı oynatınız.",end="")


                    else:
                        if oyun_alani[keyS][valS - 1] != False:
                            print(
                                "Seçtiğiniz karede taş bulunmamaktadır ve aynı zamanda lütfen boş bir kareye hareket ediniz.",end="")
                        else:
                            print(
                                "Seçtiğiniz karede taş bulunmamaktadır. Lütfen kendi taşınızın olduğu bir kareyi seçiniz.",end="")
                    val, key, valS, keyS = tas_konumu_al(boyut, harfler)

                else:  # Oyuncu1 kendi taşını seçtiyse
                    if oyun_alani[keyS][valS - 1] != False:
                        print("Lütfen boş bir kareye hareket ediniz:", end="")
                        val, key, valS, keyS = tas_konumu_al(boyut, harfler)

            elif oyuncu_sirasi == oyuncu2:
                while oyun_alani[key][val - 1] != "Oyuncu2":
                    print("Lütfen kendi taşınızın olduğu bir konumu seçiniz:", end="")
                    val, key, valS, keyS = tas_konumu_al(boyut, harfler)
                else:
                    pass

            oyun_alani[key][val - 1] = False

            oyun_alani[keyS][valS - 1] = yeni_konum

            oyun_tahtasini_yazdir(boyut, harfler, oyun_alani, oyuncu1, oyuncu2)

            if oyuncu_sirasi == oyuncu1:
                oyuncu_sirasi = oyuncu2
                yeni_konum = "Oyuncu2"
            else:
                oyuncu_sirasi = oyuncu1
                yeni_konum = "Oyuncu1"


main()