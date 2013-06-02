//
//  Principale.m
//  nemesis
//
//  Created by mattia benedetti on 02/06/13.
//  Copyright (c) 2013 mattia benedetti. All rights reserved.
//

#import "Principale.h"
#import <CoreLocation/CoreLocation.h>
#include "reportController.h"

@interface Principale ()

@end

@implementation Principale
@synthesize mapView;


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self)
    {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
    
    mapView.showsUserLocation = YES;
    
    locationManager = [[CLLocationManager alloc] init];
    locationManager.delegate = self;
    locationManager.desiredAccuracy = kCLLocationAccuracyBest;
    [locationManager startUpdatingLocation];

}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
    NSLog(@"didFailWithError: %@", error);
    UIAlertView *errorAlert = [[UIAlertView alloc]
                               initWithTitle:@"Error" message:@"Failed to Get Your Location" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
    [errorAlert show];
}

- (void)locationManager:(CLLocationManager *)manager didUpdateToLocation:(CLLocation *)newLocation fromLocation:(CLLocation *)oldLocation
{
    NSLog(@"didUpdateToLocation: %@", newLocation);
    CLLocation *currentLocation = newLocation;
    
    if (currentLocation != nil)
    {
        NSLog(@"LONG: %@",[NSString stringWithFormat:@"%.8f", currentLocation.coordinate.longitude]);
        NSLog(@"LAT: %@", [NSString stringWithFormat:@"%.8f", currentLocation.coordinate.latitude]);
        
        latitudine = [NSString stringWithFormat:@"%.8f", currentLocation.coordinate.longitude];
        longitudine = [NSString stringWithFormat:@"%.8f", currentLocation.coordinate.latitude];
        
        MKUserLocation *userLocation = mapView.userLocation;
        MKCoordinateRegion region =
        MKCoordinateRegionMakeWithDistance ( userLocation.location.coordinate, 150, 150);
        [mapView setRegion:region animated: YES];
    }
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if ([segue.identifier isEqualToString:@"view_report"])
    {
        ReportController *vc = [segue destinationViewController];
        vc.longitudine = longitudine;
        vc.latitudine = latitudine;
    }
}

-(IBAction)do_report:(id)sender
{
    [locationManager stopUpdatingLocation];
    [self performSegueWithIdentifier: @"view_report" sender: self];
}

@end
