// Grupa 234: Matei Cristina, Tudorache Andrei, Chicarosa Denisa, Jipa Teodora
// Acest algoritm reprezinta o simulare a procesului de user scheduling
// Pentru a il introduce in OpenBSD trebuie verificate fisierele:
// - sys/kern/kern_sched.c -> you will find details about the implementation of choosing CPU to run process (especially for SMP kernels) and also the logic implementation for choosing the process, run queue management related functions, etc.
// - sys/kern/sched_bsd.c -> you will find details about their scheduler, that is, round-robin, with lots of stuff and calculations for computing priorities, updating priorities of the process, switching, yielding, preemption etc


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

const int USERMAX = 10000;
struct user
{
	char name[50];
	int quantum;
	int nrpids;
	int pids[2048];
	int time_exec[2048];
};


struct user utilizatori[USERMAX];

int nrUser;

void ExtractData()
{
	// extrag userii si pidurile din terminal
	system("ps xao user > user.txt"); // system -> in stdlib
	system("ps xao pid > pid.txt");
}

void DataReading()
{
	FILE *u, *p;
	 // pe lin i a fisierului user.txt am userul pidului de pe linia i din fisierul pid.txt
	u = fopen("user.txt", "r");
	p = fopen("pid.txt", "r");
	
	char word[50];
	int current_pid;
	nrUser = 0;
	srand(time(NULL));
	// fisierele incep cu cuvantul User, respectiv Pid, si vreau sa sar peste acestea
	fscanf(u, "%s", word);
	fscanf(p, "%s", word);

	// citesc pidul si userul corespunzator
	while( ( fscanf(u, "%s", word) ==1 ) && ( fscanf(p, "%d", &current_pid) ==1 ) )
	{
		int i;
		int user_occurrence = 0;
		for ( int i = 0; i < nrUser; i++ )
		{
			// daca userul apare in lista de utilizatori, atunci adaug pidul la lista lui de procese
			if ( strcmp(word, utilizatori[i].name) == 0 )
			{
				user_occurrence = 1;
				int nrp = utilizatori[i].nrpids;
				utilizatori[i].pids[nrp] = current_pid;
				utilizatori[i].time_exec[nrp] = rand()%20 + 1;
				utilizatori[i].nrpids++;
				break;
			}
		}

		// daca userul nu a mai aparut pana acum il punem in lista cu un singur pid
		if ( user_occurrence == 0 )
		{
			strcpy(utilizatori[nrUser].name, word);
			//utilizatori[nrUser].quantum = rand()%20 + 1;// fiecare user are o quanta care precizeaza cat timp este lasat sa ruleze fiecare proces al acestuia
			utilizatori[nrUser].pids[0] = current_pid;
			utilizatori[nrUser].time_exec[0] = rand()%10 + 1;
			utilizatori[nrUser].nrpids = 1;

			
			nrUser++;
		}
	}

	// politica de alegere a quantei
	for ( int i = 0; i < nrUser; i++ )
	{
		double medie = 0;
		for ( int j = 0; j < utilizatori[i].nrpids; j++ )
		{
			medie += utilizatori[i].time_exec[j];
		}
		utilizatori[i].quantum = (int)medie/utilizatori[i].nrpids;
	}
	fclose(u);
	fclose(p);

}


void RoundRobin()
{
	// user weighted round robin = round robin pe useri
	FILE *out;
	out = fopen("rezultat.txt", "w");
	int pid_in_execution[nrUser];
	for ( int i = 0; i < nrUser; i++ )
	{
		pid_in_execution[i] = 0; // pun in lista indicele procesului care se executa primul la fiecare user
		
	}

	int nrUser_in_execution = nrUser;

	while(1)
	{
		for ( int i = 0; i < nrUser; i++ )//parcurg userii
		{

			int position_of_current_pid = pid_in_execution[i];
			if ( nrUser_in_execution == 0 )
			{
				fprintf(out, "S-au executat toate procesele tuturor userilor");
				fclose(out);
				return;
			}

			if ( pid_in_execution[i] < utilizatori[i].nrpids )
			{

				if( utilizatori[i].time_exec[position_of_current_pid] > utilizatori[i].quantum )
				{
					utilizatori[i].time_exec[position_of_current_pid]-=utilizatori[i].quantum;
					fprintf(out, "Se executa procesul cu pid %d al utilizatorului %s care mai are %d timp de executie\n", utilizatori[i].pids[position_of_current_pid], utilizatori[i].name, utilizatori[i].time_exec[position_of_current_pid]);
				}
				else
				{
					pid_in_execution[i]++;
					fprintf(out, "S-a terminat procesul cu pid %d al utilizatorului %s\n", utilizatori[i].pids[position_of_current_pid], utilizatori[i].name );
					if ( pid_in_execution[i] >= utilizatori[i].nrpids )
						nrUser_in_execution--;
				}		
			}
		}
	}
}

int main()
{
	ExtractData();
	DataReading();
	RoundRobin();
	return 0;
}