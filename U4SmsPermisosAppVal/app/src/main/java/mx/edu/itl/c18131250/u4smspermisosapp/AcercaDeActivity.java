/*------------------------------------------------------------------------------------------
:*                         TECNOLOGICO NACIONAL DE MEXICO
:*                                CAMPUS LA LAGUNA
:*                     INGENIERIA EN SISTEMAS COMPUTACIONALES
:*                             DESARROLLO EN ANDROID "A"
:*
:*                   SEMESTRE: ENE-JUN/2022    HORA: 10-11 HRS
:*
:*            Actividad que muestra en pantalla la informacion de Acerca De
:*
:*  Archivo     : AcercaDeActivity.java
:*  Autor       : Valentin Herrera Castorena     18131250
:*  Fecha       : 29/Abril/2022
:*  Compilador  : Android Studio Artic Fox 2020.3
:*  Descripci�n : Esta clase nos muestra una pantalla la cual contiene toda la informacion acerca
                   del creador de la aplicacion, version de la misma, etc.
:*  Ultima modif:
:*  Fecha       Modific�             Motivo
:*==========================================================================================
:*  dd/mmm/aaaa Fultano de tal       Motivo de la modificacion, puede ser en mas de 1 renglon.
:*------------------------------------------------------------------------------------------*/

package mx.edu.itl.c18131250.u4smspermisosapp;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

//--------------------------------------------------------------------------------------------------
public class AcercaDeActivity extends AppCompatActivity {

//--------------------------------------------------------------------------------------------------
    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_acerca_de);
    }
//--------------------------------------------------------------------------------------------------
}